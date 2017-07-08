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
import CreateChat from './android.src/CreateChat.js';
import ChangeInfo from './android.src/ChangeInfo.js';
import ChatRoom from './android.src/component/ChatRoom.js';
import Game2048 from './android.src/component/games/game2048/main';
import Basketball from './android.src/component/games/basketballgame/Basketball';
import Soccer from './android.src/component/games/soccergame/Soccer';
import Main from './android.src/component/games/Tetrisgame/src/main';
import HomeScreen from './android.src/component/games/Gamespage';
import {
  AppRegistry,
} from 'react-native';

console.ignoredYellowBox = ['Setting a timer for a long'];

export default class circle extends Component {
  render() {
    return (
      <Router>
        <Scene key="root">
          <Scene key="login" component={LoginPage}
            type={ActionConst.RESET} hideNavBar={true} initial={true} />
          <Scene key="pickicon" component={IconPicker} hideNavBar={true}/>
          <Scene key="mainPage" hideNavBar={true} component={MainPage}
            type={ActionConst.RESET}/>
          <Scene key="ChangeInfo" component={ChangeInfo} hideNavBar={false} title='Profile'/>
          <Scene key="chatRoom1" component={ChatRoom} hideNavBar={true}/>
          <Scene key="chatRoom2" component={ChatRoom} hideNavBar={true}/>
          <Scene key="createChat" component={CreateChat} />
          <Scene key="gameMainpage" component={HomeScreen} hideNavBar={true} />
          <Scene key="game2048" component={Game2048} hideNavBar={false} title='2048 game'/>
          <Scene key="Basketball" component={Basketball} hideNavBar={false}title='Basketball game'/>
          <Scene key="Soccer" component={Soccer} hideNavBar={false}title='Soccer game'/>
          <Scene key="Tetris" component={Main} hideNavBar={false}title='Tettis game'/>
        </Scene>
      </Router>
    );
  }
}


AppRegistry.registerComponent('circle', () => circle);
