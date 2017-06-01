/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import Mainpage from './android.src/Mainpage';
import {
  AppRegistry,
} from 'react-native';

export default class circle extends Component {
  render() {
    return (
      <Mainpage/>
    );
  }
}


AppRegistry.registerComponent('circle', () => circle);
