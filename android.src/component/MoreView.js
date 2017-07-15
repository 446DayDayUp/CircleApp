/**
 * Created by zachary on 2017-06-19.
 */
import React, {Component} from 'react';
import { Actions } from 'react-native-router-flux';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  PixelRatio,
  TouchableOpacity,
} from 'react-native';
import { UID, SERVER_URL } from '../data/globals.js';
import { getGpsCord } from '../lib/gps.js';
import * as http from '../lib/http.js';

let {width} = Dimensions.get('window');

const icons = [require('../../img/ic_more_gallery.png'), require('../../img/ic_more_movie.png'), require('../../img/ic_more_position.png'), require('../../img/small_game.png')];

const iconTexts = ['Photo', 'Video', 'Location', 'Game'];

export default class MoreView extends Component {
  render() {
    let parts = [];
    for (let i = 0; i < 4; i++) {
      if(iconTexts[i] === 'Video' || iconTexts[i] === 'Photo' || iconTexts[i] === 'Location'){
        parts.push(
          <Cell
          updateView={this.props.updateView}
          key={i}
          icon={icons[i]}
          text={iconTexts[i]}
          socket={this.props.socket}
          roomId = {this.props.roomId}
          userName = {this.props.userName}
          iconName = {this.props.iconName}
        />);
      }
      else {
        parts.push(<Cell key={i} icon={icons[i]} text={iconTexts[i]}/>);
      }
    }
    return (
      <View style={styles.moreViewContainer}>
        {parts}
      </View>
    );
  }
}

class Cell extends Component {
  constructor(props) {
    super(props);
    this.sendMsg = this.sendMsg.bind(this);
    this.sendLoc = this.sendLoc.bind(this);

  };

  sendMsg() {
    this.props.socket.emit('chat', this.props.roomId, UID,
        this.props.userName, this.props.iconName, this.state.img);
  }

  sendLoc(lat, lng) {
    this.props.socket.emit('chat', this.props.roomId, 'location', UID,
      this.props.userName, this.props.iconName, '',
        {'lat': lat, 'lng': lng});
  }

  _handlePress(type) {
    if (type === 'Photo' || type === 'Video') {
      let ImagePicker = require('react-native-image-picker');
      let options;
      if(type === 'Photo'){
        options = {
          quality: 0.2,
          title: '',
          takePhotoButtonTitle: 'Take photo...',
          mediaType: 'photo',
        };
      } else{
        options = {
          chooseFromLibraryButtonTitle: null,
          videoQuality: 'low',
          durationLimit: 5,
          title: '',
          takePhotoButtonTitle: 'Take video...',
          mediaType: 'video',
      };
    }

      ImagePicker.showImagePicker(options, (response) => {
        console.log('Response = ', response);

        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
        } else {
          http.upload(SERVER_URL, 'upload-file', Math.floor(Date.now())+UID, response.uri, 'image/jpg')
              .then((res, err) => {
                return res.json();
              }).then((json) => {
                this.props.socket.emit('chat', this.props.roomId, 'image' , UID,
                  this.props.userName, this.props.iconName, json.url,
                  {'height': response.height, 'width': response.width});
              });
        }
      });
      this.props.updateView(false);
    }
    if(type == 'Game') {
      Actions.gameMainpage();
    }
    if (type == 'Location') {
      getGpsCord().then(function(location) {
        this.sendLoc(location.lat, location.lng);
      }.bind(this)).catch(function(error) {
        console.warn('error', error);
      });
      this.props.updateView(false);
    }
  }
  render() {
    return (
      <TouchableOpacity style={styles.cellContainer} onPress={() => this._handlePress(this.props.text)}>
        <View style={styles.cellImgContainer}>
          <Image style={styles.cellImage} source={this.props.icon}/>
        </View>
        <Text style={styles.cellText}>{this.props.text}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  moreViewContainer: {
    width: width,
    height: 100,
    flexDirection: 'row',
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: '#F4F4F4'
  },
  cellContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 10
  },
  cellImgContainer: {
    width: 55,
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FBFBFB',
    borderWidth: 1 / PixelRatio.get(),
    borderColor: '#DFDFDF',
    borderRadius: 10
  },
  cellImage: {
    width: 35,
    height: 35
  },
  cellText: {
    fontSize: 13
  }
});
