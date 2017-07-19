import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  AsyncStorage,
  StyleSheet,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { executeFunc } from '../../lib/functionRegister.js';

export default class TextMessage extends Component {
  constructor(props) {
    super(props);
    this.socket = executeFunc('getSocket');
    this.state = {
      selfUsername: '',
      selfIcon: '',
    }
  }

  render() {
    let promises = [];
    promises.push(AsyncStorage.getItem('userName'));
    promises.push(AsyncStorage.getItem('iconName'));
    Promise.all(promises).then(function(result) {
      let userName = result[0];
      let iconName = result[1];
      this.setState({
        selfUsername: userName,
        selfIcon: iconName,
      });
    }.bind(this));
    if (this.props.msg.opt.game === 'soccer') {
      return(
      <TouchableOpacity style = {styles.container} onPress = {function() {
        Actions.Soccer({
          socket: this.socket,
          roomId: this.props.msg.roomId,
          userName: this.state.selfUsername,
          backtwice: false,
        });
      }.bind(this)}>
        <Image
          style = {{width: 50, height: 50}}
          source={require('../../../img/soccer.png')}
        />
        <Text style={{paddingTop: 5, fontSize: 20, flexDirection: 'column'}}>    {this.props.msg.userName} scored {this.props.msg.opt.score} points!!! </Text>
      </TouchableOpacity>
      )
    }else{
      return(
        <TouchableOpacity style = {styles.container} onPress = {function() {
          Actions.Basketball({
            socket: this.socket,
            roomId: this.props.msg.roomId,
            userName: this.state.selfUsername,
            backtwice: false,
          });
        }.bind(this)}>
          <Image
            style = {{width: 50, height: 50}}
            source={require('../../../img/bball.png')}
          />
          <Text style={{paddingTop: 5, fontSize: 20, flexDirection: 'column'}}>    {this.props.msg.userName} scored {this.props.msg.opt.score} points!!! </Text>
        </TouchableOpacity>
      )
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
  },
});
