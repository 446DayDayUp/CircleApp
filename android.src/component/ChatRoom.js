import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  BackHandler,
  Dimensions,
  PixelRatio,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Ionicons';
import Messages from './Messages.js';
import BottomBar from './BottomBar';
import MoreView from './MoreView.js';

var { width, height } = Dimensions.get('window');
class ChatRoomList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: this.props.messages || [],
      showMenu: false,
      showMoreView: false,
    };
    this.socketListener = this.socketListener.bind(this);
    this.showMenus = this.showMenus.bind(this);
    this.onTouchOutside = this.onTouchOutside.bind(this);
    this.renderMenuItem = this.renderMenuItem.bind(this);
    this.clearHistory = this.clearHistory.bind(this);
    this.scrollToBottom = this.scrollToBottom.bind(this);
  }

  componentWillMount() {
    BackHandler.addEventListener('chatRoom', this.onBackHandler);
    this.props.socket.on('chat', this.socketListener);
    this.props.socket.on('enterRoom', this.socketListener);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('chatRoom', this.onBackHandler);
    this.props.socket.removeListener('chat', this.socketListener);
    this.props.socket.removeListener('enterRoom', this.socketListener);
  }

  socketListener() {
    this.msgComp.updateMessage(this.state.messages);
    setTimeout(function() {
      if (this && this.msgComp) this.msgComp.scrollToBottom();
    }.bind(this), 200);
  };

  onBackHandler() {
    Actions.pop();
    return true;
  };


  showMenus() {
    this.setState({
      showMenu: !this.state.showMenu,
    });
  }

  onTouchOutside() {
    this.setState({
      showMenu: false,
    });
  }

  updateView = ( more) => {
    this.setState({
      showMoreView: more,
    })
  }

  clearHistory() {
    this.state.messages.length = 0;
    this.msgComp.updateMessage(this.state.messages);
    this.setState({
      showMenu: false,
    });
  }
  scrollToBottom() {
    setTimeout(() => this.msgComp.scrollToBottom(), 500);
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
    let moreView = [];
    if (this.state.showMoreView) {
      moreView.push(
        <View key={'more-view-key'}>
          <View style={{width: width, height: 1 / PixelRatio.get(), backgroundColor: global.dividerColor}} />
          <View style={{height: 100}}>
            <MoreView />
          </View>
        </View>
      );
    }
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

        <View style={styles.bottomBar}>
          <BottomBar
            scrollToBottom={this.scrollToBottom}
            updateView={this.updateView}
            socket={this.props.socket}
            roomId = {this.props.roomId}
            userName = {this.props.userName}
            iconName = {this.props.iconName}
          />
        </View>
        {moreView}
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
  },
  bottomBar: {
    height: 50,
  },
});

export default ChatRoomList;
