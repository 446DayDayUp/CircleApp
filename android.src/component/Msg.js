import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  Image,
  FlatList,
} from 'react-native';
import { profilePicture } from '../lib/profilePicture.js';

export default class Msg extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return false;
  }

  render() {
    let msg = this.props.msg;
    if (!this.props.isSend) {
      return (
        <View style={listItemStyle.container}>
          <Image style={listItemStyle.iconView} source={profilePicture[msg.iconName]} />
          <View>
            <Text> {msg.userName} </Text>
            <View style={listItemStyle.msgContainer}>
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
  }
}

const listItemStyle = StyleSheet.create({
  container: {
    flex: 1,
    width: Dimensions.get('window').width,
    flexDirection: 'row',
    padding: 15,
  },
  iconView: {
    width: 40,
    height: 40,
  },
  msgContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 3,
    paddingLeft: 8,
    paddingRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 5,
  },
  msgContainerSend: {
    backgroundColor: '#9FE658',
    borderRadius: 3,
    paddingLeft: 8,
    paddingRight: 8,
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
});
