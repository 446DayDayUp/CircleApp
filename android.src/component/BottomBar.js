/**
 * Created by zachary on 2017-06-19.
 */
import React, { Component } from 'react';
import dismissKeyboard from 'dismissKeyboard';
import Icon from 'react-native-vector-icons/Ionicons';

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  Dimensions,
  PixelRatio,
  StatusBar,
  FlatList,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
} from 'react-native';

let { width, height } = Dimensions.get('window');

const BAR_STATE_SHOW_KEYBOARD = 1;
const BAR_STATE_SHOW_RECORDER = 2;

export default class BottomBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      barState: BAR_STATE_SHOW_KEYBOARD,
      showMoreView: false,
      text: '',
    };
    this.sendMsg = this.sendMsg.bind(this);
  }

  sendMsg() {
    if (this.state.text !== ''){
      this.props.socket.emit('chat', this.props.roomId, this.props.userName,
        this.props.iconName, this.state.text);
      this.setState({
        text: '',
      });
      this.props.scrollToBottom();
    }
  }

  onFocus() {
    this.setState({
      showMoreView: false,
    })
    this.props.updateView(false);
  }

  render() {
    let barState = this.state.barState;
    switch (barState) {
      case BAR_STATE_SHOW_KEYBOARD:
        return this.renderKeyBoardView();
        break;
      case BAR_STATE_SHOW_RECORDER:
        return this.renderRecorderView();
        break;
    }
  }
  renderKeyBoardView() {
    return (
      <View style={styles.container}>
        <TouchableOpacity style = {{padding: 5}} activeOpacity={0.5} onPress={this.handlePress.bind(this, "soundBtn")}>
          <Icon name= 'ios-mic'
                size={40}
                color='#4f8ef7'
          />
        </TouchableOpacity >
        <TextInput
          multiline={true}
          style={{flex: 10}}
          value={this.state.text}
          onChangeText={(text) => this.setState({text})}
          onSubmitEditing={this.sendMsg}
          onFocus={ () => this.onFocus()}
        />
        <TouchableOpacity style = {{padding: 5}} activeOpacity={0.5} onPress={this.sendMsg}>
          <Icon name= 'ios-send'
                size={40}
                color='#4f8ef7'
          />
        </TouchableOpacity>
        <TouchableOpacity style = {{padding: 5}} activeOpacity={0.5} onPress={this.handlePress.bind(this, "moreBtn")}>
          <Icon name= 'ios-add-circle'
                size={40}
                color='#4f8ef7'
          />
        </TouchableOpacity>
      </View>
    );
  }
  renderRecorderView() {
    return (
      <View style={styles.container}>
        <TouchableOpacity style = {{padding: 5}} activeOpacity={0.5} onPress={this.handlePress.bind(this, "soundBtn")}>
          <Icon name= 'ios-chatboxes'
                size={40}
                color='#4f8ef7'
          />
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.5} style={{flex: 1}}>
          <View style={styles.recorder}><Text>Press to speak</Text></View>
        </TouchableOpacity>
        <TouchableOpacity style = {{padding: 5}} activeOpacity={0.5} onPress={this.sendMsg}>
          <Icon name= 'ios-send'
                size={40}
                color='#4f8ef7'
          />
        </TouchableOpacity>
        <TouchableOpacity style = {{padding: 5}} activeOpacity={0.5} onPress={this.handlePress.bind(this, "moreBtn")}>
          <Icon name= 'ios-add-circle'
                size={40}
                color='#4f8ef7'
          />
        </TouchableOpacity>
      </View>
    );
  }
  handlePress = (tag) => {
    dismissKeyboard();
    if ("soundBtn" == tag) {
      if (this.state.barState === BAR_STATE_SHOW_KEYBOARD) {
        this.setState({
          barState: BAR_STATE_SHOW_RECORDER,
          showMoreView: false,
        });
      } else if (this.state.barState === BAR_STATE_SHOW_RECORDER) {
        this.setState({
          barState: BAR_STATE_SHOW_KEYBOARD,
          showMoreView: false,
        });
      }
      this.props.updateView(false);
    } else if ("moreBtn" == tag) {
      let showMoreView = this.state.showMoreView;
      this.props.updateView(!showMoreView);
      this.setState({
        showMoreView: !showMoreView
      });
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    height: 50,
    alignItems: 'center',
    backgroundColor: '#F4F4F4',
    paddingLeft: 10,
    paddingRight: 10,
  },
  input: {
    flex: 1,
  },
  icon: {
    width: 40,
    height: 40,
    padding: 5,
  },
  recorder: {
    flex: 1,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10,
    marginBottom: 10,
    borderWidth: 1 / PixelRatio.get(),
    borderColor: '#6E7377',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  }
});
