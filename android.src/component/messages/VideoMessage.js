import React, { Component } from 'react';
import {
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  Modal,
  ScrollView,
} from 'react-native';
import { profilePicture } from '../../lib/profilePicture.js';
import Icon from 'react-native-vector-icons/Ionicons';
import { listItemStyle } from '../../css/MessageCSS.js';

export default class VideoMessage extends Component {
  constructor(props) {
    super(props);
    this.changeImage = this.changeImage.bind(this);
    this.state = {
      showPicture: false,
    }
  }

  changeImage(bool) {
    this.setState({
      showPicture: bool,
    })
  }

  render() {
    let smallWidth = 200;
    let msg = this.props.msg;
    let scale;
    let optheight;
    let optwidth;
    scale = parseInt(msg.opt.width)/smallWidth;
    optheight = parseInt(msg.opt.height);
    optwidth = parseInt(msg.opt.width);
    if (!this.props.isSend) {
      return (
        <View>
          <Modal
            animationType={'fade'}
            transparent={false}
            visible={this.state.showPicture}
            onRequestClose={() => this.changeImage(false)}>
            <ScrollView
              contentContainerStyle=
            {
              (optheight/
                (optwidth/Dimensions.get('window').width) < Dimensions.get('window').height)?
              listItemStyle.smallpicture : {backgroundColor: 'black',}
            }>
            <TouchableOpacity onPress = {this.changeImage.bind(this, false)}>
              <Image
                style={{height: optheight/
                  (optwidth/Dimensions.get('window').width)}}
                source={{uri: msg.text}}
              />
            </TouchableOpacity>
            </ScrollView>
          </Modal>
          <View style={listItemStyle.container}>
            <Image style={listItemStyle.iconView} source={profilePicture[msg.iconName]} />
            <View style={{width: smallWidth}}>
              <Text> {msg.userName} </Text>
              <TouchableOpacity onPress={() => this.changeImage(true)}>
                <Image
                  style={{height: parseInt(msg.opt.height)/scale}}
                  resizeMode='contain'
                  source={{uri: msg.text}}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      );
    } else {
      return (
        <View style={listItemStyle.containerSend}>
          <Modal
            animationType={'fade'}
            transparent={false}
            visible={this.state.showPicture}
            onRequestClose={() => this.changeImage(false)}>
            <ScrollView
              contentContainerStyle=
              {
                (optheight/
                  (optwidth/Dimensions.get('window').width) < Dimensions.get('window').height)?
                listItemStyle.smallpicture : {backgroundColor: 'black',}
              }>
              <TouchableOpacity onPress = {this.changeImage.bind(this, false)}>
                <Image style = {{height: optheight/
                  (optwidth/Dimensions.get('window').width)}}
                  source={{uri: msg.text}}
                />
              </TouchableOpacity>
            </ScrollView>
          </Modal>
          <View style={{width: smallWidth}}>
            <View style={{alignItems: 'flex-end'}}>
              <Text> {msg.userName} </Text>
            </View>
            <View>
              <TouchableOpacity onPress={() => this.changeImage(true)}>
                <Image
                  style={{height: parseInt(msg.opt.height)/scale}}
                  resizeMode='contain'
                  source={{uri: msg.text}}
                />
              </TouchableOpacity>
            </View>
          </View>
          <Image style={listItemStyle.iconView} source={profilePicture[msg.iconName]} />
        </View>
      );
    }
  }
}
