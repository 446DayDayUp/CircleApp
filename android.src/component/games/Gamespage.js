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
} from 'react-native';
import { Actions } from 'react-native-router-flux';


class HomeScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      Game1Score: 0,
      //renew: true,
    };

  }


  render() {
    return (
      <View>
        <View>
        <TouchableOpacity style={styles.btn} onPress={() => Actions.game2048()}>
          <Text style={styles.btnText}> Game 2048 </Text>
        </TouchableOpacity>
          <Text style={styles.btnText}>                 Your best score:
            {this.props.newScore? this.props.newScore : this.state.Game1Score}</Text>
        </View>
        <TouchableOpacity style={styles.btn} onPress={() => Actions.Basketball()}>
          <Text style={styles.btnText}> Basketball </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btn} onPress={() => Actions.Soccer()}>
          <Text style={styles.btnText}> Soccer </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btn} onPress={() => Actions.Tetris()}>
          <Text style={styles.btnText}> Tetris </Text>
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
