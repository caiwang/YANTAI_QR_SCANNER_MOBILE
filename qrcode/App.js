
import React, { Component } from 'react';
import { Platform,StyleSheet,View,Text,ScrollView,AsyncStorage, DeviceEventEmitter } from 'react-native';
import Route from './src/Route';
import axios from 'axios';
import {url} from '././src/config';
class App extends Component{
  

  
  render() {
    return (
      <Route />
    );
  };
}

export default App