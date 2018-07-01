import React, { Component } from 'react';
import { FlatList, Text, View } from 'react-native';
import axios from 'axios';
import PhotoDetail from './PhotoDetail';

class PhotoList extends Component {
  state = { photos: [], reload: false};

  componentWillMount() {
    axios.get(`https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=6e8a597cb502b7b95dbd46a46e25db8d&photoset_id=${this.props.albumId}&user_id=141025070%40N08&format=json&nojsoncallback=1`)
    .then((response) => {
      var aux;
      response.data.photoset.photo.map(photo => {
        axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.comments.getList&api_key=bf8f6eb6d8864de3bcac43bbf25ecc1e&photo_id=${photo.id}&format=json&nojsoncallback=1'`)
        .then(res => {
          if(res.data.comments.comment)
          photo["comment"] = this.getComments(res.data.comments.comment)
          else
          photo["comment"]= '[sin comentarios]'

          aux = this.state.photos
          aux.push(photo)
          this.setState({ photos: aux})
        })
      })
    });
  }

  getComments(comments){
    var commentsString = '';
    comments.map(comment => commentsString = commentsString + '-' + comment.realname + ': ' + comment._content + '\n');
    return commentsString.slice(0, -1);
  }

  renderItem(photo) {
    return <PhotoDetail key={photo.item.title} title={photo.item.title} comments={photo.item.comment} imageUrl={`https://farm${photo.item.farm}.staticflickr.com/${photo.item.server}/${photo.item.id}_${photo.item.secret}.jpg`} />
  }

  render() {
    console.log(this.state);


    if (!this.state.photos) { 
			return (
                <View style={{ flex: 1 }}>
					<Text>
                        Cargando...
					</Text>
                </View>
				);
    }

    return (
        <View style={{ flex: 1 }}>
            <FlatList
              data = {this.state.photos}
              renderItem = {this.renderItem}
              keyExtractor = {photo => photo.id}
            />
        </View>
    );
  }
}

export default PhotoList;
