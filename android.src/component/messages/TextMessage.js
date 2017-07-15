import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import { profilePicture } from '../../lib/profilePicture.js';
import Icon from 'react-native-vector-icons/Ionicons';
import { listItemStyle } from '../../css/MessageCSS.js';
import ProfileView from '../ProfileView.js';

export default class TextMessage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showProfile: false,
    }
  }
  render() {
    let smallWidth = 200;
    let msg = this.props.msg;
    if (!this.props.isSend) {
      return (
        <View>
          <ProfileView showProfile={this.state.showProfile}
            hideProfile={() => this.setState({showProfile: false})}
            msg={msg}/>
          <View style={listItemStyle.container}>
            <TouchableOpacity
              style={listItemStyle.iconView}
              onPress={() => {this.setState({showProfile: true})}}>
              <Image
                style={listItemStyle.iconImageView}
                source={profilePicture[msg.iconName]} />
            </TouchableOpacity>
            <View>
              <Text> {msg.userName} </Text>
              <View style={listItemStyle.msgContainerRecv}>
                <Text style={listItemStyle.msgText}>{msg.text}</Text>
              </View>
            </View>
          </View>
        </View>
      );
    } else {
      return (
        <View style={listItemStyle.containerSend}>
          <View>
            <View style={{alignItems: 'flex-end'}}>
              <Text> {msg.userName} </Text>
            </View>
            <View style={listItemStyle.msgContainerSend}>
              <Text style={listItemStyle.msgText}>{msg.text}</Text>
            </View>
          </View>
          <TouchableOpacity
            style={listItemStyle.iconView}
              onPress={() => {}}>
            <Image
              style={listItemStyle.iconImageView}
              source={profilePicture[msg.iconName]} />
          </TouchableOpacity>
        </View>
      );
    }
  }
}
