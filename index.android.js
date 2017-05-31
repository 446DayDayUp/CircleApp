/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import LoginPage from './android.src/LoginPage.js';
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

export default class circle extends Component {
  render() {
    return (
      <LoginPage/>
      // <Text></Text>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('circle', () => circle);
