import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { profilePicture } from '../lib/profilePicture.js';
import Icon from 'react-native-vector-icons/Ionicons';
import {audioPlayer} from '../lib/audioPlayer.js';

var SingletonPlayer = (function() {
  let player;

  function createInstance() {
    return new audioPlayer();
  }

  return {
    getInstance: function(url) {
      if (!player) {
        player = createInstance();
      }
      return player;
    }
  }
})();

export default class Msg extends Component {
  constructor(props) {
    super(props);
    this.playAudioMsg = this.playAudioMsg.bind(this);
    this.getAudioDuration = this.getAudioDuration.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (this.props.msg.text !== nextProps.msg.text ||
      this.props.msg.userName !== nextProps.msg.userName ||
      this.props.msg.iconName !== nextProps.msg.iconName ||
      this.props.isSend !== nextProps.isSend);
  }

  playAudioMsg(url) {
    SingletonPlayer.getInstance().play(url);
  }

  getAudioDuration(url) {
    let cb = (d) => {
      console.warn('dddd ', d);
      return d;
    }
  }

  render() {
    let msg = this.props.msg;
    if (msg.type === 'chat') {
      if (!this.props.isSend) {
        return (
          <View style={listItemStyle.container}>
            <Image style={listItemStyle.iconView} source={profilePicture[msg.iconName]} />
            <View>
              <Text> {msg.userName} </Text>
              <View style={listItemStyle.msgContainerRecv}>
                <Text style={listItemStyle.msgText}>{msg.text}</Text>
              </View>
            </View>
          </View>
        );
      } else {
        return (
          <View style={listItemStyle.containerSend}>
            <View>
              <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-end'}}>
                <Text> {msg.userName} </Text>
              </View>
              <View style={listItemStyle.msgContainerSend}>
                <Text style={listItemStyle.msgText}>{msg.text}</Text>
              </View>
            </View>
            <Image style={listItemStyle.iconView} source={profilePicture[msg.iconName]} />
          </View>
        );
      }
    } else if (msg.type === 'audio') {
      let duration = this.getAudioDuration(msg.text);
      if (!this.props.isSend) {
        return (
          <View style={listItemStyle.container}>
            <Image style={listItemStyle.iconView} source={profilePicture[msg.iconName]} />
            <View>
              <Text> {msg.userName} </Text>
              <TouchableOpacity style={audioContainer(false, duration)} onPress={this.playAudioMsg.bind(this, msg.text)}>
                <Icon name='ios-wifi' size={20} color='grey' style={listItemStyle.audioMsgRecvIcon}/>
              </TouchableOpacity>
            </View>
          </View>
        );
      } else {
        let duration = this.getAudioDuration(msg.text);
        console.warn('d ', duration);
        return (
          <View style={listItemStyle.containerSend}>
            <View>
              <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-end'}}>
                <Text> {msg.userName} </Text>
              </View>
              <TouchableOpacity style={audioContainer(true, duration)} onPress={this.playAudioMsg.bind(this, msg.text)}>
                <Icon name='ios-wifi' size={20} color='grey' style={listItemStyle.audioMsgSendIcon}/>
              </TouchableOpacity>
            </View>
            <Image style={listItemStyle.iconView} source={profilePicture[msg.iconName]} />
          </View>
        );
      }
    } else if (msg.type === 'notice') {
      return (
        <Text style = {listItemStyle.noticeText}> {msg.text} </Text>
      )
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
    width = 40 + duration;
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

const listItemStyle = StyleSheet.create({
  container: {
    flex: 1,
    width: Dimensions.get('window').width,
    flexDirection: 'row',
    padding: 5,
  },
  iconView: {
    width: 40,
    height: 40,
  },
  msgContainerRecv: {
    backgroundColor: '#FFFFFF',
    borderRadius: 3,
    paddingLeft: 8,
    paddingRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 3,
    marginLeft: 5,
  },
  msgContainerSend: {
    backgroundColor: '#9FE658',
    borderRadius: 3,
    paddingLeft: 8,
    paddingRight: 8,
    paddingBottom: 3,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5,
  },
  msgText: {
    maxWidth: Dimensions.get('window').width - 150,
    flexWrap: 'wrap',
    color: 'black',
    fontSize: 15,
    lineHeight: 24,
  },
  containerSend: {
    flex: 1,
    width: Dimensions.get('window').width,
    flexDirection: 'row',
    padding: 5,
    justifyContent: 'flex-end',
  },
  noticeText: {
    fontSize: 15,
    color: '#A4A4A4',
    textAlign: 'left',
    fontWeight: 'bold',
  },
  audioContainerRecv: {
    backgroundColor: '#FFFFFF',
    borderRadius: 3,
    paddingLeft: 8,
    paddingRight: 8,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingBottom: 3,
    marginLeft: 5,
    width: 100,
  },
  audioContainerSend: {
    backgroundColor: '#9FE658',
    borderRadius: 3,
    paddingLeft: 8,
    paddingRight: 8,
    paddingBottom: 3,
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginRight: 5,
    width: 100,
  },
  audioMsgRecvIcon: {
    transform: [{ rotate: '90deg' }],
  },
  audioMsgSendIcon: {
    transform: [{ rotate: '270deg' }],
  },
});
