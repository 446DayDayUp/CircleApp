import React, { Component } from 'react';
import {
  Text,
  View,
  Modal,
  TouchableOpacity,
  Image,
  StyleSheet,
  Button,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import CheckBox from 'react-native-check-box';
import { profilePicture } from '../lib/profilePicture.js';
import { blacklist } from '../lib/blacklist.js';
import { Actions } from 'react-native-router-flux';
import { executeFunc } from '../lib/functionRegister.js';

export default class ProfileView extends Component {
  constructor(props) {
    super(props);
    this.startOneToOneChat = this.startOneToOneChat.bind(this);
  }

  startOneToOneChat() {
    setTimeout(function() {
      let msg = this.props.msg;
      executeFunc('joinPrivateChat', [
        msg.uid,
        msg.userName,
        true,
      ]);
    }.bind(this), 200);
    Actions.pop();
  }

  render() {
    let msg = this.props.msg;
    return (
      <Modal
        animationType={"slide"}
        transparent={false}
        visible={this.props.showProfile}
        onRequestClose={this.props.hideProfile}
        >
        <View style={styles.headerView}>
          <TouchableOpacity
            onPress={this.props.hideProfile}
            style={{paddingLeft: 10}}>
            <Icon name='ios-arrow-back'
              size={40}
              color='white'
            />
          </TouchableOpacity>
        </View>
        <View>
          <Image source={profilePicture[msg.iconName]}/>
          <Text style={styles.largeText}>{msg.userName}</Text>
          <Button
            onPress={this.startOneToOneChat}
            title='Start one-to-one chat'
            color='#4f8ef7'
          />
          <CheckBox
            style={{ padding: 10}}
            onClick={() => blacklist.modifyBlacklist(msg.uid, {
              userName: msg.userName,
              iconName: msg.iconName,
            }, msg.roomId)}
            isChecked={blacklist.checkBlacklist(msg.uid, msg.roomId)}
            leftText={'Blacklist the user in this room'}
          />
          <CheckBox
            style={{ padding: 10}}
            onClick={() => blacklist.modifyBlacklist(msg.uid, {
              userName: msg.userName,
              iconName: msg.iconName,
            })}
            isChecked={blacklist.checkBlacklist(msg.uid)}
            leftText={'Blacklist the user in all chats'}
          />
       </View>
      </Modal>
      );
  }
}


export const styles = StyleSheet.create({
  headerView: {
    height: 40,
    backgroundColor: '#4f8ef7',
    flexDirection: 'row'
  },
  largeText: {
    fontSize: 30,
    fontWeight: 'bold',
    padding: 10,
  },
});
