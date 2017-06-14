import React, { Component } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    ScrollView,
    TouchableHighlight,
    BackHandler,
    ToastAndroid,
    Alert,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import MarqueeLabel from 'react-native-lahk-marquee-label';
import Icon from 'react-native-vector-icons/Ionicons';
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
      displayedAllRooms: [],
      displayedJoinedRooms: [],
      showSearch: false,
      searchCondition: '',
    };
    this.refreshRoomList();
    this.joinRoom = this.joinRoom.bind(this);
    this.quitRoom = this.quitRoom.bind(this);
    this.updateRoom = this.updateRoom.bind(this);
    this.refreshRoomList = this.refreshRoomList.bind(this);
    this.showSearch = this.showSearch.bind(this);
    this.showSearchComp = this.showSearchComp.bind(this);
    this.joinChatRoom = this.joinChatRoom.bind(this);
    this.onBackHandler = this.onBackHandler.bind(this);
    this.getChatRoom = this.getChatRoom.bind(this);
    this.roomInfo = {};
    this.chatRoomSwitch = true;
    this.showSearchCondition = this.showSearchCondition.bind(this);
  }

  //add double back to exit app
  componentWillMount(){
    BackHandler.addEventListener('MainPage', this.onBackHandler);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('MainPage', this.onBackHandler);
  }

  getChatRoom() {
    this.chatRoomSwitch = !this.chatRoomSwitch;
    if(this.chatRoomSwitch) return 'chatRoom1';
    else return 'chatRoom2';
  }

  onBackHandler() {
    if (this.lastBackPressed && this.lastBackPressed + 2000 >= Date.now()) {
      return false;
    }
    this.lastBackPressed = Date.now();
    ToastAndroid.show('Press back again to leave', ToastAndroid.SHORT);
    return true;
  }

  // Join a nearby chat room which has not joined and jump to chat room scene.
  joinRoom(room) {
    let displayedAllRooms = this.state.displayedAllRooms.filter((r) =>
        r._id !== room._id);
    let displayedJoinedRooms = [
      ...this.state.joinedRooms,
      room,
    ];
    this.setState({
      joinedRooms: displayedJoinedRooms,
    });
    // Join the chat room;
    let socket = io(SERVER_URL);
    socket.emit('room', room._id); // Join room by roomId.
    if (!this.roomInfo[room._id]) this.roomInfo[room._id] = {
      messages: [],
      socket,
    };
    socket.on('chat', function(sid, userName, iconName, msg) {
      this.roomInfo[room._id].messages.push({
        sid,
        userName,
        iconName,
        text: msg,
      });
    }.bind(this));
    Actions[this.getChatRoom()]({
      socket: this.roomInfo[room._id].socket,
      name: room.name,
      roomId: room._id,
      messages: this.roomInfo[room._id].messages,
      userName: this.props.userName,
      iconName: this.props.iconName,
    });
    this.updateRoom(displayedAllRooms, displayedJoinedRooms);
  }

  // Quit a chat room.
  quitRoom(room) {
    let displayedJoinedRooms = this.state.displayedJoinedRooms.filter((r) =>
        r._id !== room._id);
    let displayedAllRooms = [
      ...this.state.allRooms,
      room,
    ];
    this.setState({
      allRooms: displayedAllRooms,
    });
    this.updateRoom(displayedAllRooms, displayedJoinedRooms);
  }

  // Jump a chat room scene which is already joined.
  joinChatRoom(room) {
    Actions[this.getChatRoom()]({
      socket: this.roomInfo[room._id].socket,
      name: room.name,
      roomId: room._id,
      messages: this.roomInfo[room._id].messages,
      userName: this.props.userName,
      iconName: this.props.iconName,
    });
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
        this.setState({
          allRooms,
          joinedRooms,
        });
        this.updateRoom(allRooms, joinedRooms);
        return;
      }.bind(this));
    }.bind(this))
    .catch((e) => {}); // Error should be handled in lib/gps.js.
  }

  updateRoom(displayedAllRooms, displayedJoinedRooms) {
    this.setState({
      displayedJoinedRooms,
      displayedAllRooms,
    })
    if(this._displayedAllRooms) this._displayedAllRooms.updateList(displayedAllRooms);
    if(this._displayedJoinedRooms) this._displayedJoinedRooms.updateList(displayedJoinedRooms);
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
      filterFrom = this.state.joinedRooms;
    } else if (tab === 'allRooms') {
      filterFrom = this.state.allRooms;
    }
    getGpsCord().then(function(position) {
      filterResult = filterFrom.filter((r) =>
        (!name || r.name.indexOf(name) !== -1) &&
          (tags.length === 0 || tags.every(elem => r.tags.indexOf(elem) > -1)) &&
            mBetweenCoords(position.lat, position.lng, r.lat, r.lng) <= range);
    });
    if (tab === 'joinedRooms') {
      setTimeout(() => this.updateRoom(this.state.allRooms, filterResult), 500);
    } else if (tab === 'allRooms') {
      setTimeout(() => this.updateRoom(filterResult, this.state.joinedRooms), 500);
    }
    let searchCondition = '';
    if (name) {
      searchCondition = 'Name: ' + name + '   ';
    }
    if (range / 1000 === 0) {
      searchCondition = searchCondition + 'Range: ' + range + 'm   ';
    } else {
      searchCondition = searchCondition + 'Range: ' + range / 1000 + 'km   ';
    }
    if (tags.length !== 0) {
      searchCondition = searchCondition + 'Tags: ';
      for (let i = 0; i < tags.length; i += 1) {
        searchCondition = searchCondition + '#' + tags[i] + ', ';
      }
    }
    this.setState({
      searchCondition,
      showSearch: false,
    });
  }

  showSearchCondition() {
    return (
      <View style = {{flex: 0.05, flexDirection: 'row', backgroundColor: '#c6e2ff'}}>
        <MarqueeLabel
          duration = {8000}
          text = {this.state.searchCondition}
          bgViewStyle = {{flex: 4}}
          textStyle = {{fontStyle: 'italic', fontSize: 14, color: '#8b3626'}}
        />
        <TouchableOpacity style = {{flex: 0.5, alignItems: 'center', justifyContent: 'center'}}
          onPress = {() => this.clearSearchCondition()}>
          <Icon name = 'ios-close-outline' size = {35} color = '#8b3626'/>
        </TouchableOpacity>
      </View>
    );
  }

  clearSearchCondition() {
    this.setState({
      searchCondition: '',
    });
    this.updateRoom(this.state.allRooms, this.state.joinedRooms);
  }

  render() {
    let tabBar = <CustomTabBar
      leftBtnLabel='md-person'
      rightBtnLabel='md-search'
      rightBtnOnPress = {() => this.showSearch()}
      userName={this.props.userName}
      iconName={this.props.iconName}/>;

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
            {this.state.showSearch ? this.showSearchComp('joinedRooms') : null}
            {!this.state.showSearch && this.state.searchCondition ? this.showSearchCondition() : null}
            {/* Joined Rooms */}
            <ChatRoomList roomActionHandler={this.quitRoom} btnText='Quit'
              ref={el=>{this._displayedJoinedRooms=el}}
              roomList={this.state.displayedJoinedRooms}
              onRoomClick={this.joinChatRoom}
              refreshList={this.refreshRoomList}/>
          </View>
          {floatBtn}
        </ScrollView>
        <ScrollView tabLabel='md-wifi' style={styles.tabView}>
          <View style={styles.card}>
            {this.state.showSearch? this.showSearchComp('allRooms') : null}
            {!this.state.showSearch && this.state.searchCondition ? this.showSearchCondition() : null}
            {/* All rooms */}
            <ChatRoomList roomActionHandler={this.joinRoom} btnText='Join'
              ref={el=>this._displayedAllRooms=el}
              roomList={this.state.displayedAllRooms}
              refreshList={this.refreshRoomList}/>
          </View>
        </ScrollView>
      </ScrollableTabView>
    );
  }
}

export default MainPage;
