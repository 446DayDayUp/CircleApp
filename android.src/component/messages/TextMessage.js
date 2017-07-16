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
        <View style={listItemStyle.container}>
          <ProfileView showProfile={this.state.showProfile}
            hideProfile={() => this.setState({showProfile: false})}
            msg={msg}/>
          <TouchableOpacity
            style={listItemStyle.iconView}
            onPress={() => {this.setState({showProfile: true})}}>
            <Image
              style={listItemStyle.iconImageView}
              source={profilePicture[msg.iconName]} />
          </TouchableOpacity>
          <View>
            <View>
              <Text>
                {msg.userName}
              </Text>
            </View>
            <View style={{alignItems: 'flex-start'}}>
              <Text style={listItemStyle.msgTextRev}>{msg.text}</Text>
            </View>
          </View>
        </View>
      );
    } else {
      return (
        <View style={listItemStyle.containerSend}>
          <View>
            <View style={{
              alignItems: 'flex-end'
            }}>
              <Text>
                {msg.userName}
              </Text>
            </View>
            <View>
              <View style={{alignItems: 'flex-end'}}>
                <Text style={listItemStyle.msgTextSend}>{msg.text}</Text>
              </View>
            </View>
          </View>
          <Image style={listItemStyle.iconView} source={profilePicture[msg.iconName]}/>
        </View>
      );
    }
  }
}
