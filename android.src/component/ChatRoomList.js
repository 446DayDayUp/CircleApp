import React, { Component } from 'react';
import {
  Text,
  View,
  ScrollView,
  ListView,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import * as http from '../lib/http.js';
import { getGpsCord } from '../lib/gps.js';
const SERVER_URL = 'https://circle-chat.herokuapp.com';

export default class ChatRoomList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chatRooms: []
    };
    getGpsCord().then(function(position) {
      http.get(SERVER_URL, 'get-chat-rooms', {
        lat: position.lat,
        lng: position.lng,
        range: 10000,
      }).then((response) => {
        return response.json();
      }).then(function(chatRooms) {
        this.setState({
          chatRooms,
        });
      }.bind(this));
    }.bind(this),
      (error) => alert(JSON.stringify(error)),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
    this.renderRoomView = this.renderRoomView.bind(this);
  }


  renderRoomView(room, index) {
    return (
      <View key={room._id} style={{borderWidth: 0.5, borderRadius: 5, padding: 5, margin: 2}}>
        <Text>{room.name} ({room.numUser})</Text>
        <Text>{room.distance}m</Text>
        <Text style={{fontStyle: 'italic'}}>
          {room.tags.map((tag) => '#'+tag+' ')}
        </Text>
      </View>
    );
  }

  render() {
    return (
      <ScrollView>
        {this.state.chatRooms.map(this.renderRoomView)}
      </ScrollView>
    );
  }
}
