import React, { Component } from 'react';
import {
  Text,
  View,
} from 'react-native';
import { listItemStyle } from '../../css/MessageCSS.js';

export default class TextMessage extends Component {
  render() {
    let smallWidth = 200;
    let msg = this.props.msg;
    return (
      <Text style = {listItemStyle.noticeText}> {msg.text} </Text>
    )
  }
}
