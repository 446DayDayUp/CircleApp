import React, { Component } from 'react';
import {
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import { profilePicture } from '../../lib/profilePicture.js';
import Icon from 'react-native-vector-icons/Ionicons';
import { SingletonPlayer } from '../../lib/audioPlayer.js';
import { listItemStyle } from '../../css/MessageCSS.js';


export default class Msg extends Component {
  constructor(props) {
    super(props);
    this.playAudioMsg = this.playAudioMsg.bind(this);
    this.getAudioDuration = this.getAudioDuration.bind(this);
  }

  playAudioMsg(url) {
    SingletonPlayer.getInstance().play(url);
  }

  getAudioDuration(url) {
    let cb = (d) => {
      return d;
    }
  }

  render() {
    let msg = this.props.msg;
    let duration = parseInt(msg.opt.length);
    if (!this.props.isSend) {
      return (
        <View style={listItemStyle.container}>
          <Image style={listItemStyle.iconView} source={profilePicture[msg.iconName]} />
          <View>
            <Text> {msg.userName} </Text>
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity style={audioContainer(false, duration)} onPress={this.playAudioMsg.bind(this, msg.text)}>
                <Icon name='ios-wifi' size={15} color='grey' style={listItemStyle.audioMsgRecvIcon}/>
              </TouchableOpacity>
              <Text>{duration}"</Text>
            </View>
          </View>
        </View>
      );
    } else {
      let duration = parseInt(msg.opt.length);
      return (
        <View style={listItemStyle.containerSend}>
          <View>
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-end'}}>
              <Text> {msg.userName} </Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text>{duration}"</Text>
              <TouchableOpacity style={audioContainer(true, duration)} onPress={this.playAudioMsg.bind(this, msg.text)}>
                <Icon name='ios-wifi' size={15} color='grey' style={listItemStyle.audioMsgSendIcon}/>
              </TouchableOpacity>
            </View>
          </View>
          <Image style={listItemStyle.iconView} source={profilePicture[msg.iconName]} />
        </View>
      );
    }
  }
}

let audioContainer = function(isSend, duration) {
  let color = '';
  let alignItem = '';
  if (isSend) {
    color = '#9FE658';
    alignItem = 'flex-end';
  } else {
    color = '#FFFFFF';
    alignItem = 'flex-start';
  }
  let width = 0;
  if (duration > 60) {
    width = Dimensions.get('window').width - 180;
  } else {
    width = 40 + 2 * duration;
  }
  return {
    backgroundColor: color,
    borderRadius: 3,
    paddingLeft: 8,
    paddingRight: 8,
    paddingBottom: 3,
    justifyContent: 'center',
    alignItems: alignItem,
    marginRight: 5,
    width: width,
  }
}
