import React, {Component} from 'react';
import {Text, View, Image, TouchableOpacity, Dimensions} from 'react-native';
import Video from 'react-native-video';
import {profilePicture} from '../../lib/profilePicture.js';
import Icon from 'react-native-vector-icons/Ionicons';
import {listItemStyle} from '../../css/MessageCSS.js';
import ProfileView from '../ProfileView.js';

export default class VideoMessage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showProfile: false,
      pauseVideo: false
    }
    this.pause = this.pause.bind(this);
  }
  controlVideo = (bool) => {
    this.setState({
      pauseVideo: bool,
    })
  }
  pause() {
    this.setState({
      pauseVideo: true,
    })
  }
  render() {
    let smallWidth = 200;
    let msg = this.props.msg;
    let videoSize = Dimensions.get('window').width - 100;
    if (!this.props.isSend) {
      return (
        <View style={listItemStyle.container}>
          <ProfileView showProfile={this.state.showProfile} hideProfile={() => this.setState({showProfile: false})} msg={msg}/>
          <TouchableOpacity style={listItemStyle.iconView} onPress={() => {
            this.setState({showProfile: true})
          }}>
            <Image style={listItemStyle.iconImageView} source={profilePicture[msg.iconName]}/>
          </TouchableOpacity>
          <View>
            <View>
              <Text>
                {msg.userName}
              </Text>
            </View>
            <View style={{
              alignItems: 'flex-start'
            }}>
            <TouchableOpacity onPress={this.controlVideo.bind(this, !this.state.pauseVideo)}>
              {this.state.pauseVideo ?
                <Image
                  source={require('../../../img/play.png')}
                  style={{zIndex: 1, position: 'absolute', width: videoSize, height: videoSize}}/> : null
              }
              <Video
                style={{width: videoSize, height: videoSize}}
                source={{
                uri: msg.text
              }} ref={(ref) => {
                this.player = ref
              }}
                rate={1.0} // 0 is paused, 1 is normal.
                // volume={1.0} // 0 is muted, 1 is normal.
                muted={false} // Mutes the audio entirely.
                paused={this.state.pauseVideo} // Pauses playback entirely.
                resizeMode="cover" // Fill the whole screen at aspect ratio.
                repeat={false} // Repeat forever.
                //onLoadStart={this.pause} // Callback when video starts to load
                onLoad={this.pause} // Callback when video loads
                // onProgress={this.setTime} // Callback every ~250ms with currentTime
                onEnd={this.pause} // Callback when playback finishes
                // onError={this.videoError} // Callback when video cannot be loaded
              />
            </TouchableOpacity>
            </View>
          </View>
        </View>
      );
    } else {
      return (
        <View style={listItemStyle.containerSend}>
          <View>
            <View style={{
              alignItems: 'flex-end'
            }}>
              <Text>
                {msg.userName}
              </Text>
            </View>
            <View>
              <View style={{
                flex: 1,
                alignItems: 'flex-end'
              }}>

              <TouchableOpacity onPress={this.controlVideo.bind(this, !this.state.pauseVideo)}>
                {this.state.pauseVideo ?
                  <Image
                    source={require('../../../img/play.png')}
                    style={{zIndex: 1, position: 'absolute', width: videoSize, height: videoSize}}/> : null
                }
                <Video
                  style={{width: videoSize, height: videoSize, zIndex: 0}}
                  source={{
                  uri: msg.text
                }} ref={(ref) => {
                  this.player = ref
                }}
                  rate={1.0} // 0 is paused, 1 is normal.
                  // volume={1.0} // 0 is muted, 1 is normal.
                  muted={false} // Mutes the audio entirely.
                  paused={this.state.pauseVideo} // Pauses playback entirely.
                  resizeMode="cover" // Fill the whole screen at aspect ratio.
                  repeat={false} // Repeat forever.
                  //onLoadStart={this.pause} // Callback when video starts to load
                  onLoad={this.pause} // Callback when video loads
                  // onProgress={this.setTime} // Callback every ~250ms with currentTime
                  onEnd={this.pause} // Callback when playback finishes
                  // onError={this.videoError} // Callback when video cannot be loaded
                />
              </TouchableOpacity>
              </View>
            </View>
          </View>
          <Image style={listItemStyle.iconView} source={profilePicture[msg.iconName]}/>
        </View>
      );
    }
  }
}
