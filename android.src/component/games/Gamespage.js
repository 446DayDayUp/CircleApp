/**
 * Created by zachary on 2017-07-06.
 */
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { Actions } from 'react-native-router-flux';


class HomeScreen extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        <View>
        <TouchableOpacity style={styles.btn} onPress={() => Actions.game2048()}>
          <Text style={styles.btnText}> Game 2048 </Text>
        </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.btn} onPress={function() {
          Actions.Basketball({
            socket: this.props.socket,
            roomId: this.props.roomId,
            userName: this.props.userName,
            backtwice: true,
          });
        }.bind(this)}>
          <Text style={styles.btnText}> Basketball </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btn} onPress={function() {
          Actions.Soccer({
            socket: this.props.socket,
            roomId: this.props.roomId,
            userName: this.props.userName,
            backtwice: true,
          });
        }.bind(this)}>
          <Text style={styles.btnText}> Soccer </Text>
        </TouchableOpacity>
        {/* <TouchableOpacity style={styles.btn} onPress={() => navigate('Bird')}>*/}
          {/* <Text style={styles.btnText}> Flappy bird </Text>*/}
        {/* </TouchableOpacity>*/}
      </View>
    );
  }
}


var styles = StyleSheet.create({
  btn: {
    width: 100,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: 'lightskyblue',
    borderRadius: 10,
    marginTop: 10,
  },

  btnText: {
    fontSize: 18,
  },
});

export default HomeScreen;
