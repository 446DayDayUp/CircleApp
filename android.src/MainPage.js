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
    this.refreshRoomList();
    this.joinRoom = this.joinRoom.bind(this);
    this.quitRoom = this.quitRoom.bind(this);
    this.updateRoom = this.updateRoom.bind(this);
    this.refreshRoomList = this.refreshRoomList.bind(this);
  }

  joinRoom(room) {
    let allRooms = this.state.allRooms.filter((r) =>
        r._id !== room._id);
    let joinedRooms = [
      ...this.state.joinedRooms,
      room,
    ];
    this.updateRoom(allRooms, joinedRooms);
  }

  quitRoom(room) {
    let joinedRooms = this.state.joinedRooms.filter((r) =>
        r._id !== room._id);
    let allRooms = [
      ...this.state.allRooms,
      room,
    ];
    this.updateRoom(allRooms, joinedRooms);
  }

  refreshRoomList() {
    return getGpsCord().then(function(position) {
      http.get(SERVER_URL, 'get-chat-rooms', {
        lat: position.lat,
        lng: position.lng,
        range: 10000,
      }).then((response) => {
        return response.json();
      }).then(function(chatRooms) {
        // Remove out-range joined room.
        // TODO: disconnect socket.
        let joinedRooms = this.state.joinedRooms.filter((r) =>
          chatRooms.filter((room) => room._id === r._id).length > 0
        );
        let allRooms = chatRooms.filter((r) =>
          joinedRooms.filter((room) => room._id === r._id).length === 0
        );
        this.updateRoom(allRooms, joinedRooms);
        return;
      }.bind(this));
    }.bind(this),
      (error) => {
        throw error;
      },
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
  }

  updateRoom(allRooms, joinedRooms) {
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
              roomList={this.state.allRooms}
              refreshList={this.refreshRoomList}/>
          </View>
        </ScrollView>
      </ScrollableTabView>
    );
  }
}

export default MainPage;
