/**
 * Created by zachary on 2017-06-19.
 */
import React, { Component } from 'react';
import dismissKeyboard from 'dismissKeyboard';
import Icon from 'react-native-vector-icons/Ionicons';
import {AudioRecorder, AudioUtils} from 'react-native-audio';

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
  PermissionsAndroid,
  PanResponder,
} from 'react-native';

let { width, height } = Dimensions.get('window');
import { UID } from '../data/globals.js';

const BAR_STATE_SHOW_KEYBOARD = 1;
const BAR_STATE_SHOW_RECORDER = 2;

export default class BottomBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      barState: BAR_STATE_SHOW_KEYBOARD,
      showMoreView: false,
      text: '',
      isRecording: false,
      audioPath: AudioUtils.DocumentDirectoryPath + '/voiceMsg.aac',
      recorderX: 0,
      recorderY: 0,
      recorderWidth: 0,
      recorderHeight: 0,
      isDiscarded: false,
    };
    this.myPanResponder={}
    this.sendMsg = this.sendMsg.bind(this);
    this.startRecord = this.startRecord.bind(this);
    this.sendRecord = this.sendRecord.bind(this);
    this.discardRecord = this.discardRecord.bind(this);
    this.checkPermission = this.checkPermission.bind(this);
    this.measureView = this.measureView.bind(this);
    this.prepareRecordPath = this.prepareRecordPath.bind(this);
  }

  componentWillMount() {
    this.myPanResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
      onPanResponderTerminationRequest: (evt, gestureState) => true,

      onPanResponderGrant: (evt, gestureState) => {
        this.startRecord();
      },
      onPanResponderMove: (evt, gestureState) => {
        let curX = parseInt(gestureState.moveX);
        let curY = parseInt(gestureState.moveY);
        if (curX - this.state.recorderX > this.state.width || curY < this.state.recorderY) {
          this.setState({
            isDiscarded: true,
          });
        } else {
          this.setState({
            isDiscarded: false,
          });
        }
      },
      onPanResponderRelease: (evt, gestureState) => {
        if (this.state.isDiscarded) {
          this.discardRecord();
        } else {
          this.sendRecord();
        }
      },
      onPanResponderTerminate: (evt, gestureState) => {
        console.warn('onPanResponderTerminate');
      },
    });
    this.prepareRecordPath();
  }

  measureView() {
    this.refs.recorder.measure((fx, fy, width, height, px, py) => {
      this.setState({
        recorderX: parseInt(px),
        recorderY: parseInt(py),
        recorderWidth: parseInt(width),
        recorderHeight: parseInt(height),
      });
    });
  }

  prepareRecordPath() {
    AudioRecorder.prepareRecordingAtPath(this.state.audioPath, {
      SampleRate: 22050,
      Channels: 1,
      AudioQuality: 'Low',
      AudioEncoding: 'aac',
      AudioEncodingBitRate: 32000
    });
  }

  checkPermission() {
    const rationale = {
      'title': 'Microphone Permission',
      'message': 'AudioExample needs access to your microphone so you can record audio.'
    };

    return PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.RECORD_AUDIO, rationale)
      .then((result) => {
        return (result === true || result === PermissionsAndroid.RESULTS.GRANTED);
    });
  }

  sendMsg() {
    if (this.state.text !== ''){
      this.props.socket.emit('chat', this.props.roomId, UID,
          this.props.userName, this.props.iconName, this.state.text);
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

  async startRecord() {
    this.setState({
      isRecording: true,
    });
    setTimeout(() => this.props.isRecording(this.state.isRecording), 100);

    try {
      const filePath = await AudioRecorder.startRecording();
    } catch (error) {
      console.warn('startError ' + error);
    }
  }

  async sendRecord() {
    this.setState({
      isRecording: false,
    });
    setTimeout(() => this.props.isRecording(this.state.isRecording), 100);
    try {
      const filePath = await AudioRecorder.stopRecording();
      // filePath ready for the server
      this.prepareRecordPath();
    } catch (error) {
      console.warn('stopError ' + error);
    }
  }

  async discardRecord() {
    this.setState({
      isRecording: false,
    });
    setTimeout(() => this.props.isRecording(this.state.isRecording), 100);
    try {
      const filePath = await AudioRecorder.stopRecording();
      // discard the record, don't send it to server
      this.prepareRecordPath();
    } catch (error) {
      console.warn('discardError ' + error);
    }
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
        </TouchableOpacity>
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
        <View style={{flex: 1}} {...this.myPanResponder.panHandlers}>
          <TouchableOpacity activeOpacity={0.5} style={{flex: 1}} onLayout={this.measureView} ref='recorder'>
            <View style={styles.recorder}><Text>{this.state.isRecording ? 'Recording...' : 'Press to speak'}</Text></View>
          </TouchableOpacity>
        </View>
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
