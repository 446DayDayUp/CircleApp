import React, { Component } from 'react';
import {
  FlatList,
} from 'react-native';
import { profilePicture } from '../lib/profilePicture.js';
import Msg from './Msg.js';

export default class Messages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: this.props.messages,
    }
  }

  scrollToBottom() {
    this.flatList.scrollToEnd({animated: true});
  }

  updateMessage = (msgs) => {
    this.setState({
      messages: msgs,
    })
  }

  renderMessage = (item) => {
    let isSend = item.item.sid == this.props.socket.id ? true : false;
    return <Msg isSend={isSend} msg={item.item} />
  }

  render() {
    return(
      <FlatList
        ref = {(r) => this.flatList = r}
        data={this.state.messages}
        extraData={this.state}
        renderItem={this.renderMessage}
        keyExtractor={(msg, i) => i}
        removeClippedSubviews={false}
      />);
  }
}
