import React, { Component } from 'react';
import {
  Text,
  View,
  ScrollView,
  ListView,
  RefreshControl,
} from 'react-native';
import ChatRoomPanel from '../component/ChatRoomPanel.js';

export default class ChatRoomList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chatRooms: this.props.roomList || [],
      refreshing: false,
    };
  }

  _onRefresh() {
    if (!this.props.refreshList) return;
    this.setState({refreshing: true});
    this.props.refreshList().then(() => {
      this.setState({refreshing: false});
    });
  }

  updateList(chatRooms) {
    this.setState({chatRooms});
  }

  render() {
    return (
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh.bind(this)}
          />
        }>
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
