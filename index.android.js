/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import {Scene, Router, ActionConst} from 'react-native-router-flux';
import React, { Component } from 'react';

import LoginPage from './android.src/LoginPage.js';
import IconPicker from './android.src/IconPicker.js';
import MainPage from './android.src/MainPage.js';

import {
  AppRegistry,
} from 'react-native';

import ChatRoomList from './android.src/component/ChatRoomList.js';

export default class circle extends Component {
  render() {
    return (
      <Router>
        <Scene key="root">
          <Scene key="login" component={LoginPage}
          type={ActionConst.RESET} hideNavBar={true} initial={true} />
          <Scene key="pickicon" component={IconPicker} />
        </Scene>
      </Router>
    );
  }
}


AppRegistry.registerComponent('circle', () => MainPage);
