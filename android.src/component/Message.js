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
    this.state = {
      selected: 0,
    }
  }

  scrollToBottom() {
    this.flatList.scrollToEnd({animated: true});
  }

  updateMessage = (i) => {
    this.setState({
      selected: i,
    })
  }

  renderMessage = (item, i) => {
    var _msg = item.item.text;
    let isSend = item.item.sid == this.props.socket.id ? true : false
    if (!isSend) {
      return (
        <View style={listItemStyle.container} key={i}>
          <Image style={listItemStyle.iconView} source={profilePicture[item.item.iconName]} />
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
        <View style={listItemStyle.containerSend} key={i}>
          <View>
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-end'}}>
              <Text> {item.item.userName} </Text>
            </View>
            <View style={listItemStyle.msgContainerSend}>
              <Text style={listItemStyle.msgText}>{_msg}</Text>
            </View>
          </View>
          <Image style={listItemStyle.iconView} source={profilePicture[item.item.iconName]} />
        </View>
      );
    }
  }

  render() {
    return(
      <FlatList
        ref = {(r) => this.flatList = r}
        data={this.props.messages}
        extraData={this.state}
        renderItem={this.renderMessage}
        keyExtractor={(msg, i) => i}
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
