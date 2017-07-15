import React, {Component} from 'react';
import {Text, View, Image} from 'react-native';
import {profilePicture} from '../../lib/profilePicture.js';
import Icon from 'react-native-vector-icons/Ionicons';
import {listItemStyle} from '../../css/MessageCSS.js';

export default class TextMessage extends Component {
  render() {
    let smallWidth = 200;
    let msg = this.props.msg;
    if (!this.props.isSend) {
      return (
        <View style={listItemStyle.container}>
          <Image style={listItemStyle.iconView} source={profilePicture[msg.iconName]}/>
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
