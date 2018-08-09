/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React, { Component } from 'react';
import { Platform,StyleSheet,View,Text,ScrollView } from 'react-native';
import Route from './src/Route';

class App extends Component{
  render() {
    return (
      <Route />
    );
  };
}

export default App