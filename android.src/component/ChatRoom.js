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
      showMenu: false,
    };
    this.sendMsg = this.sendMsg.bind(this);
    this.socketListener = this.socketListener.bind(this);
    this.props.socket.on('chat', this.socketListener);
    this.scroll = this.scroll.bind(this);
    this.showMenus = this.showMenus.bind(this);
    this.onTouchOutside = this.onTouchOutside.bind(this);
    this.renderMenuItem = this.renderMenuItem.bind(this);
    this.clearHistory = this.clearHistory.bind(this);
  }

  componentWillMount() {
    BackHandler.addEventListener('chatRoom', this.onBackHandler);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('chatRoom', this.onBackHandler);
    this.props.socket.removeListener('chat', this.socketListener);
  }

  socketListener() {
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

  showMenus() {
    this.setState({
      showMenu: true,
    });
  }

  onTouchOutside() {
    this.setState({
      showMenu: false,
    });
  }

  clearHistory() {
    this.state.messages.length = 0;
    this.setState({
      showMenu: false,
    });
  }

  renderMenuItem() {
     if (this.state.showMenu) {
      return (
      <View style={styles.menu}>
        <TouchableOpacity onPress={this.clearHistory}>
          <View style={styles.menuItem}>
            <Icon name='md-trash'
              size={20}
              color='#4f8ef7'
              style={styles.menuIcon}
            />
            <Text style={styles.menuText}>clear</Text>
          </View>
        </TouchableOpacity>
      </View>
      );
     }
    return null;
  }

  render() {
    return (
      <TouchableOpacity style={styles.ChatRoomView}
        onPress={this.onTouchOutside}
        activeOpacity={1}>
        {/*Header contains back button, menu button and chat room name*/}
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
          <TouchableOpacity
            onPress={this.showMenus}
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
          {this.renderMenuItem()}
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
      </TouchableOpacity>
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
    backgroundColor: '#EBEBEB',
  },
  headerView: {
    height: 40,
    backgroundColor: '#4f8ef7',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
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
  },
  menu: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '#ffffff',
  },
  menuText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4f8ef7'
  },
  menuItem: {
    flexDirection: 'row',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 5,
    paddingRight: 5,
  },
  menuIcon: {
    paddingTop: 5,
  }
});

export default ChatRoomList;
