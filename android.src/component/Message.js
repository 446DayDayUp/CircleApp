import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
} from 'react-native';
import { profilePicture } from '../lib/profilePicture.js';

class Message extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let msg = this.props.msg;
    return (
      <View style={styles.container}>
        { // Align left if message is sent by user.
          this.props.selfId === msg.sid ? <View style={styles.flexOne}/> : null}
        <View style={styles.message}>
          <View style={[styles.userInfoLine,
            {justifyContent: this.props.selfId === msg.sid ? 'flex-end' : 'flex-start'}]}>
            <Image source={profilePicture[msg.iconName]}
              resizeMode='contain' style={styles.iconImage}/>
            <Text style={[styles.userName]}>{msg.userName}</Text>
          </View>
          <Text>{msg.text}</Text>
        </View>
        { // Align right if message is sent by user.
          this.props.selfId !== msg.sid ? <View style={styles.flexOne}/> : null}
      </View>
    );
  }
}


export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  message: {
    backgroundColor: 'skyblue',
    flex: 2,
  },
  userInfoLine: {
    flexDirection: 'row',
    height: 30,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  flexOne: {
    flex: 1,
  },
  iconImage: {
    width: 25,
    height: 25,
  },
});

export default Message;