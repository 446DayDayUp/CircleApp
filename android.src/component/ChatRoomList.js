import React, { Component } from 'react';
import {
  Text,
  View,
  ScrollView,
  ListView,
} from 'react-native';
import ChatRoomPanel from '../component/ChatRoomPanel.js';

export default class ChatRoomList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chatRooms: this.props.roomList || [],
    };
  }

  updateList(chatRooms) {
    this.setState({chatRooms});
  }

  render() {
    return (
      <ScrollView>
        {this.state.chatRooms.map((r) =>
          <ChatRoomPanel room={r} key={r._id}
            btnText={this.props.btnText}
            btnHandler={function(r) {
              this.props.roomActionHandler(r)
            }.bind(this, r)}/>)}
      </ScrollView>
    );
  }
}
