import React, { Component } from 'react';
import {
  ScrollView,
  RefreshControl,
} from 'react-native';
import ChatRoomPanel from '../component/ChatRoomPanel.js';
import { styles } from '../css/MainPageCSS.js';

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
          style={{backgroundColor: '#F8F8F8'}}
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
              this.props.roomActionHandler(r);
            }.bind(this, r)}/>)}
      </ScrollView>
    );
  }
}
