import React, { Component } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    ScrollView,
    TouchableHighlight,
    BackHandler,
    ToastAndroid,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import CustomTabBar from './component/CustomTabBar.js';
import ChatRoomList from './component/ChatRoomList';
import * as http from './lib/http.js';
import { getGpsCord } from './lib/gps.js';
import { mBetweenCoords } from './lib/location.js'
import {styles} from './css/MainPageCSS.js';
import Search from './component/Search.js';

window.navigator.userAgent = 'ReactNative';
const io = require('socket.io-client');

const SERVER_URL = 'https://circle-chat.herokuapp.com';

class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allRooms: [],
      joinedRooms: [],
      displayedRooms: [],
      showSearch: false,
    };
    this.refreshRoomList();
    this.joinRoom = this.joinRoom.bind(this);
    this.quitRoom = this.quitRoom.bind(this);
    this.updateRoom = this.updateRoom.bind(this);
    this.refreshRoomList = this.refreshRoomList.bind(this);
    this.showSearch = this.showSearch.bind(this);
    this.showSearchComp = this.showSearchComp.bind(this);
    this.roomFilter = this.roomFilter.bind(this);
  }

  //add double back to exit app
  componentWillMount(){
    BackHandler.addEventListener('hardwareBackPress', this.onBackHandler);
  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackHandler);
  }
  onBackHandler = () => {
    if (this.lastBackPressed && this.lastBackPressed + 2000 >= Date.now()) {
      return false;
    }
    this.lastBackPressed = Date.now();
    ToastAndroid.show('Press back again to exit Circle', ToastAndroid.SHORT);
    return true;
  };

  // joinRoom(room) {
  //   let allRooms = this.state.allRooms.filter((r) =>
  //       r._id !== room._id);
  //   let joinedRooms = [
  //     ...this.state.joinedRooms,
  //     room,
  //   ];
  //   this.updateRoom(allRooms, joinedRooms);
  // }

  joinRoom(room) {
    let displayedRooms = this.state.displayedRooms.filter((r) =>
        r._id !== room._id);
    let joinedRooms = [
      ...this.state.joinedRooms,
      room,
    ];
    this.updateRoom(displayedRooms, joinedRooms);
  }

  // quitRoom(room) {
  //   let joinedRooms = this.state.joinedRooms.filter((r) =>
  //       r._id !== room._id);
  //   let allRooms = [
  //     ...this.state.allRooms,
  //     room,
  //   ];
  //   this.updateRoom(allRooms, joinedRooms);
  // }

  quitRoom(room) {
    let joinedRooms = this.state.joinedRooms.filter((r) =>
        r._id !== room._id);
    let displayedRooms = [
      ...this.state.displayedRooms,
      room,
    ];
    this.updateRoom(displayedRooms, joinedRooms);
  }

  // refreshRoomList() {
  //   return getGpsCord().then(function(position) {
  //     http.get(SERVER_URL, 'get-chat-rooms', {
  //       lat: position.lat,
  //       lng: position.lng,
  //       range: 10000,
  //     }).then((response) => {
  //       return response.json();
  //     }).then(function(chatRooms) {
  //       // Remove out-range joined room.
  //       // TODO: disconnect socket.
  //       let joinedRooms = this.state.joinedRooms.filter((r) =>
  //         chatRooms.filter((room) => room._id === r._id).length > 0
  //       );
  //       let allRooms = chatRooms.filter((r) =>
  //         joinedRooms.filter((room) => room._id === r._id).length === 0
  //       );
  //       this.updateRoom(allRooms, joinedRooms);
  //       return;
  //     }.bind(this));
  //   }.bind(this),
  //     (error) => {
  //       throw error;
  //     },
  //     {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
  //   );
  // }

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
        this.setState({
          allRooms,
        })
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

  // updateRoom(allRooms, joinedRooms) {
  //   this.setState({
  //     allRooms,
  //     joinedRooms,
  //     displayedRooms: allRooms,
  //   })
  //   if(this._allRooms) this._allRooms.updateList(allRooms);
  //   if(this._joinedRooms) this._joinedRooms.updateList(joinedRooms);
  // }

  updateRoom(displayedRooms, joinedRooms) {
    this.setState({
      joinedRooms,
      displayedRooms,
    })
    if(this._displayedRooms) this._displayedRooms.updateList(displayedRooms);
    if(this._joinedRooms) this._joinedRooms.updateList(joinedRooms);
  }

  showSearch() {
    this.setState({
      showSearch: !this.state.showSearch,
    });
  }

  showSearchComp(tab) {
    return <Search style = {styles.searchComp}
      passTagsFromSearchComp = {this.getSearchCondition.bind(this)}
      passCurTabToSearchComp = {tab}/>;
  }

  getSearchCondition(sc) {
    let tab = sc.pop();
    let tags = sc.pop();
    let range = sc.pop();
    let name = sc.pop();
    let filterResult = [];
    let filterFrom = [];
    if (tab === 'joinedRooms') {
      //his.roomFilter(this.state.joinedRooms, name, range, tags);
      filterFrom = this.state.joinedRooms;
    } else if (tab === 'allRooms') {
      // let displayedRooms = this.roomFilter(this.state.allRooms, name, range, tags);
      // setTimeout(() => this.updateRoom(displayedRooms, this.state.joinedRooms), 500);
      filterFrom = this.state.allRooms;
    }
    getGpsCord().then(function(position) {
      filterResult = filterFrom.filter((r) =>
        (!name || r.name === name) &&
          (tags.length === 0 || tags.every(elem => r.tags.indexOf(elem) > -1)) &&
            mBetweenCoords(position.lat, position.lng, r.lat, r.lng) <= range);
    });
    if (tab === 'joinedRooms') {
      setTimeout(() => this.updateRoom(this.state.allRooms, filterResult), 500);
    } else if (tab === 'allRooms') {
      setTimeout(() => this.updateRoom(filterResult, this.state.joinedRooms), 500);
    }
    // let allRooms = this.state.allRooms;
    // let displayedRooms = [];
    // getGpsCord().then(function(position) {
    //   displayedRooms = allRooms.filter((r) =>
    //     (!name || r.name === name) &&
    //       (tags.length === 0 || tags.every(elem => r.tags.indexOf(elem) > -1)) &&
    //         mBetweenCoords(position.lat, position.lng, r.lat, r.lng) <= range);
    // });
    // setTimeout(() => this.updateRoom(displayedRooms, this.state.joinedRooms), 500);
  }

  roomFilter(filterFrom, name, range, tags) {
    let displayedRooms = [];
    getGpsCord().then(function(position) {
      displayedRooms = filterFrom.filter((r) =>
        (!name || r.name === name) &&
          (tags.length === 0 || tags.every(elem => r.tags.indexOf(elem) > -1)) &&
            mBetweenCoords(position.lat, position.lng, r.lat, r.lng) <= range);
    });
    console.warn(displayedRooms.length);
    return displayedRooms;
  }

  // render() {
  //   let tabBar = <CustomTabBar
  //     leftBtnLabel='md-person'
  //     rightBtnLabel='md-search'
  //     rightBtnOnPress = {() => this.showSearch()}/>;

  //   let floatBtn = <TouchableHighlight style={styles.addButton}
  //     underlayColor='#ff7043' onPress={Actions.createChat}>
  //     <Text style={{fontSize: 30, color: 'white'}}>+</Text>
  //   </TouchableHighlight>;
  //   return(
  //     <ScrollableTabView
  //       scrollWithoutAnimation = {true}
  //       initialPage={1}
  //       renderTabBar={() => tabBar}>
  //       <ScrollView tabLabel='ios-chatbubbles' style={styles.tabView} >
  //         <View style={styles.card}>
  //           <ChatRoomList roomActionHandler={this.quitRoom} btnText='Quit'
  //             ref={el=>{this._joinedRooms=el}}
  //             roomList={this.state.joinedRooms}/>
  //         </View>
  //         {floatBtn}
  //       </ScrollView>
  //       <ScrollView tabLabel='md-wifi' style={styles.tabView}>
  //         <View style={styles.card}>
  //           {this.state.showSearch? this.showSearchComp() : null}
  //           <ChatRoomList roomActionHandler={this.joinRoom} btnText='Join'
  //             ref={el=>this._allRooms=el}
  //             roomList={this.state.allRooms}
  //             refreshList={this.refreshRoomList}/>
  //         </View>
  //       </ScrollView>
  //     </ScrollableTabView>
  //   );
  // }

  render() {
    let tabBar = <CustomTabBar
      leftBtnLabel='md-person'
      rightBtnLabel='md-search'
      rightBtnOnPress = {() => this.showSearch()}/>;

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
            {this.state.showSearch? this.showSearchComp('joinedRooms') : null}
            <ChatRoomList roomActionHandler={this.quitRoom} btnText='Quit'
              ref={el=>{this._joinedRooms=el}}
              roomList={this.state.joinedRooms}/>
          </View>
          {floatBtn}
        </ScrollView>
        <ScrollView tabLabel='md-wifi' style={styles.tabView}>
          <View style={styles.card}>
            {this.state.showSearch? this.showSearchComp('allRooms') : null}
            <ChatRoomList roomActionHandler={this.joinRoom} btnText='Join'
              ref={el=>this._displayedRooms=el}
              roomList={this.state.displayedRooms}
              refreshList={this.refreshRoomList}/>
          </View>
        </ScrollView>
      </ScrollableTabView>
    );
  }
}

export default MainPage;
