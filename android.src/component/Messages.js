import React, { Component } from 'react';
import {
  FlatList,
} from 'react-native';
import { profilePicture } from '../lib/profilePicture.js';
import { createMessage } from './messages/Message.js';
import { UID } from '../data/globals.js';

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
    let isSend = item.item.uid == UID ? true : false;
    return createMessage(item.item, isSend)
  }

  render() {
    return(
      <FlatList
        ref = {(r) => this.flatList = r}
        data={this.state.messages}
        extraData={this.state}
        renderItem={this.renderMessage}
        keyExtractor={(msg, i) => i}
        removeClippedSubviews={true}
      />);
  }
}
