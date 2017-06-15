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

export default class Message extends Component {
  constructor(props) {
    super(props);
  }

  scrollToBottom() {
    this.flatList.scrollToEnd({animated: true});
  }

  renderMessage = (item) => {
    var _msg = item.item.msg;
    if (!item.item.isSend) {
      return (
        <View style={listItemStyle.container} key={item.item.key}>
          <Image style={listItemStyle.iconView} source={item.item.iconName} />
          <View>
            <Text> {item.item.userName} </Text>
            <View style={listItemStyle.msgContainer}>
              <Text style={listItemStyle.msgText}>{_msg}</Text>
            </View>
          </View>
        </View>
      );
    } else {
      return (
        <View style={listItemStyle.containerSend} key={item.item.key}>
          <View>
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-end'}}>
              <Text> {item.item.userName} </Text>
            </View>
            <View style={listItemStyle.msgContainerSend}>
              <Text style={listItemStyle.msgText}>{_msg}</Text>
            </View>
          </View>
          <Image style={listItemStyle.iconView} source={item.item.iconName} />
        </View>
      );
    }
  }

  render() {
    let msgs = this.props.messages;
    let listData = [];
    for(i = 0; i < msgs.length; i++){
      listData.push({
        key: i,
        msg: msgs[i].text,
        userName: msgs[i].userName,
        iconName: profilePicture[msgs[i].iconName],
        isSend: msgs[i].sid == this.props.socket.id ? true : false
      });
    }
    return(
      <FlatList
        ref = {(r) => this.flatList = r}
        data={listData}
        renderItem={this.renderMessage}
      />);
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
