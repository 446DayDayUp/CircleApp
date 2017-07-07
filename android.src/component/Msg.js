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
    return (this.props.msg.text !== nextProps.msg.text ||
      this.props.msg.userName !== nextProps.msg.userName ||
      this.props.msg.iconName !== nextProps.msg.iconName ||
      this.props.isSend !== nextProps.isSend);
  }

  render() {
    let msg = this.props.msg;
    if (msg.type === 'chat' || msg.type === 'image') {
      if (!this.props.isSend) {
        return (
          <View>
            {msg.type === 'chat' ?
              <View style={listItemStyle.container}>
                <Image style={listItemStyle.iconView} source={profilePicture[msg.iconName]} />
                <View>
                  <Text> {msg.userName} </Text>
                  <View style={listItemStyle.msgContainerRecv}>
                    <Text style={listItemStyle.msgText}>{msg.text}</Text>
                  </View>
                </View>
              </View>
              :
              <View style={listItemStyle.container}>
                <Image style={listItemStyle.iconView} source={profilePicture[msg.iconName]} />
                <View style={{width: Dimensions.get('window').width - 100}}>
                  <Text> {msg.userName} </Text>
                  <Image
                    style={{height: 250}}
                    resizeMode='contain'
                    source={{uri: msg.text}}
                  />
                </View>
              </View>
            }
          </View>
        );
      } else {
        return (
          <View style={listItemStyle.containerSend}>
            {msg.type === 'chat' ?
            <View>
              <View style={{alignItems: 'flex-end'}}>
                <Text> {msg.userName} </Text>
              </View>
              <View style={listItemStyle.msgContainerSend}>
                <Text style={listItemStyle.msgText}>{msg.text}</Text>
              </View>
            </View>
            :
            <View style={{width: Dimensions.get('window').width - 100}}>
              <View style={{alignItems: 'flex-end'}}>
                <Text> {msg.userName} </Text>
              </View>
              <View>
                <Image
                  style={{height: 250}}
                  resizeMode='contain'
                  source={{uri: msg.text}}
                />
              </View>
            </View>}
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

const listItemStyle = StyleSheet.create({
  container: {
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
    paddingBottom: 5,
    marginLeft: 5,
  },
  msgContainerSend: {
    backgroundColor: '#9FE658',
    borderRadius: 3,
    paddingLeft: 8,
    paddingRight: 8,
    paddingBottom: 5,
    //justifyContent: 'center',
    alignItems: 'flex-end',
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
  }
});
