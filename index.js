// Index.ios.js - place code in here for IOS!!!!

// Import a library to help create a component
import React from 'react';
import { AppRegistry, View } from 'react-native';
import Header from './src/components/header';
import AlbumList from './src/components/AlbumList';
import PhotoList from './src/components/PhotoList';
import { Router, Scene } from 'react-native-router-flux';

// Create a component
const App = () => (
      <Router>
        <Scene key="root">
          <Scene key="albumList" component={AlbumList} title="Albums" initial={true} />
          <Scene key="photoList" component={PhotoList} title="Photos" />
        </Scene>
      </Router>
);

// Render it to the device
AppRegistry.registerComponent('albums', () => App);
