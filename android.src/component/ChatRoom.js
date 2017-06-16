import React, { Component } from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  BackHandler,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Ionicons';
import Messages from './Messages.js';

class ChatRoomList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: this.props.messages || [],
      text: '',
    };
    this.sendMsg = this.sendMsg.bind(this);
    this.socketListener = this.socketListener.bind(this);
    this.props.socket.on('chat', this.socketListener);
    this.scroll = this.scroll.bind(this);
  }


  componentWillMount() {
    BackHandler.addEventListener('chatRoom', this.onBackHandler);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('chatRoom', this.onBackHandler);
    this.props.socket.removeListener('chat', this.socketListener);
  }

  socketListener() {
    this.msgComp.scrollToBottom();
    this.msgComp.updateMessage(this.state.messages);
    setTimeout(() => this.msgComp.scrollToBottom(), 50);
  };

  onBackHandler() {
    Actions.pop();
    return true;
  };

  sendMsg() {
    if (this.state.text !== ''){
      this.props.socket.emit('chat', this.props.roomId, this.props.userName,
      this.props.iconName, this.state.text);
      this.setState({
        text: '',
      });
      setTimeout(() => this.msgComp.scrollToBottom(), 500);
    }
  }

  scroll(t) {
    this.setState({text: t});
    this.msgComp.scrollToBottom();
  }

  render() {
    return (
      <View style={styles.ChatRoomView}>

        <View style={styles.headerView}>
          <TouchableOpacity
            onPress={Actions.pop}
            style={styles.backKey}>
            <Icon name='ios-arrow-back'
              size={40}
              color='white'
            />
          </TouchableOpacity>
          <Text style={styles.titleText}>{this.props.name}</Text>
          <TouchableOpacity onPress={() => {}}
              style={styles.menuKey}>
            <Icon name='ios-menu'
              size={40}
              color='white'
            />
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
            <Messages messages={this.state.messages}
              socket={this.props.socket}
              ref={(r)=>this.msgComp = r}
            />
        </View>

        <KeyboardAvoidingView behavior='height' style={styles.bottom}>
          <TextInput
            multiline={true}
            style={{flex: 10}}
            value={this.state.text}
            onChangeText={(text) => this.scroll(text)}
            onSubmitEditing={this.sendMsg}
          />
          <TouchableOpacity style={{flex: 1}} onPress={this.sendMsg}>
            <Icon
              name = 'ios-send-outline'
              size = {50}
              color = 'skyblue'
            />
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

export const styles = StyleSheet.create({
  ChatRoomView: {
    flex: 1,
    flexDirection: 'column',
  },
  content: {
    flex: 10,
    flexDirection: 'column',
    alignItems: 'flex-start',
    backgroundColor: '#EBEBEB'
  },
  headerView: {
    height: 40,
    backgroundColor: 'skyblue',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  backKey: {
    paddingLeft: 10,
  },
  menuKey: {
    paddingRight: 10,
  },
  bottom: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default ChatRoomList;
