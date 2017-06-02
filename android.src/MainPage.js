import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ScrollView,
    TouchableHighlight,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import CustomTabBar from './component/CustomTabBar.js';
import ChatRoomList from './component/ChatRoomList';
import * as http from './lib/http.js';
import { getGpsCord } from './lib/gps.js';
import {styles} from './css/MainPageCSS.js';

const SERVER_URL = 'https://circle-chat.herokuapp.com';

class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allRooms: [],
      joinedRooms: [],
    };
    // this.state.allRooms = [];
    // this.state.joinedRooms = [];
    getGpsCord().then(function(position) {
      http.get(SERVER_URL, 'get-chat-rooms', {
        lat: position.lat,
        lng: position.lng,
        range: 10000,
      }).then((response) => {
        return response.json();
      }).then(function(chatRooms) {
        this.state.allRooms = chatRooms;
        this._allRooms.updateList(this.state.allRooms);
      }.bind(this));
    }.bind(this),
      (error) => alert(JSON.stringify(error)),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
    this.joinRoom = this.joinRoom.bind(this);
    this.quitRoom = this.quitRoom.bind(this);
  }

  joinRoom(room) {
    let allRooms = this.state.allRooms.filter((r) =>
        r._id !== room._id);
    let joinedRooms = [
      ...this.state.joinedRooms,
      room,
    ];
    this.setState({
      allRooms,
      joinedRooms,
    })
    if(this._allRooms) this._allRooms.updateList(allRooms);
    if(this._joinedRooms) this._joinedRooms.updateList(joinedRooms);
  }

  quitRoom(room) {
    let joinedRooms = this.state.joinedRooms.filter((r) =>
        r._id !== room._id);
    let allRooms = [
      ...this.state.allRooms,
      room,
    ];
    this.setState({
      allRooms,
      joinedRooms,
    })
    if(this._allRooms) this._allRooms.updateList(allRooms);
    if(this._joinedRooms) this._joinedRooms.updateList(joinedRooms);
  }

  render() {
    let tabBar = <CustomTabBar
      leftBtnLabel='md-person'
      rightBtnLabel='md-search'/>;

    let floatBtn = <TouchableHighlight style={styles.addButton}
      underlayColor='#ff7043' onPress={Actions.createChat}>
      <Text style={{fontSize: 30, color: 'white'}}>+</Text>
    </TouchableHighlight>;

    return(
      <ScrollableTabView
        scrollWithoutAnimation = {true}
        initialPage={1}
        renderTabBar={() => tabBar}>
        <ScrollView tabLabel='ios-chatbubbles' style={styles.tabView} >
          <View style={styles.card}>
            <ChatRoomList roomActionHandler={this.quitRoom} btnText='Quit'
              ref={el=>{this._joinedRooms=el}}
              roomList={this.state.joinedRooms}/>
          </View>
          {floatBtn}
        </ScrollView>
        <ScrollView tabLabel='md-wifi' style={styles.tabView}>
          <View style={styles.card}>
            <ChatRoomList roomActionHandler={this.joinRoom} btnText='Join'
              ref={el=>this._allRooms=el}
              roomList={this.state.allRooms}/>
          </View>
        </ScrollView>
      </ScrollableTabView>
    );
  }
}

export default MainPage;
