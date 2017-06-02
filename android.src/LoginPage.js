import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import dismissKeyboard from 'dismissKeyboard';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
} from 'react-native';

export default class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {userName: ''};
    this.initialIcon = require('../img/pikachu-2.png');
    this.initialIconName = 'pikachu-2';
    this._logIn = this._logIn.bind(this);
  }

  _logIn() {
    Actions.mainPage({
      userName: this.state.userName ? this.state.userName : this.props.userName,
      iconName: this.props.iconName ? this.props.iconName : this.initialIconName,
    });
  }

  _goToIconPage() {
    dismissKeyboard();
    let n = this.state.userName ? this.state.userName : this.props.userName;
    Actions.pickicon({userName: n});
  }

  render() {
    return (
      <Image source={require('../img/background7.jpg')} style={styles.background}>
        <View style={styles.container}>
          <View style={styles.title}>
            <View style={styles.insideTitle}>
              <Text style={styles.circletitle}>Circle</Text>
              <Image source={require('../img/logo2.png')} style={styles.logo}/>
            </View>
          </View>

          <View style={styles.bottom}>
            <View style={styles.iconView}>
              <TouchableOpacity onPress={() => this._goToIconPage()} >
                <Image
                  source={this.props.icon ? this.props.icon : this.initialIcon}
                style={styles.icon} />
              </TouchableOpacity>
            </View>

            <View
              style={{flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center'}}>
              <View style={{flex: 1}}></View>
              <TextInput
                underlineColorAndroid='deepskyblue'
                style={styles.inputStyle}
                placeholder={this.props.userName ? this.props.userName : 'Nickname'}
                onChangeText={(userName) => this.setState({userName})}
              />
              <View style={{flex: 1}}></View>
            </View>


            <TouchableOpacity style={styles.loginBtn} onPress={this._logIn}>
                <Text
                  style={{fontSize: 30, color: 'white', fontWeight: 'bold'}}>
                  Log in
                </Text>
            </TouchableOpacity>

            <View></View>
          </View>
        </View>
      </Image>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'rgba(240, 255, 250, 0.3)',
  },
  bottom: {
    flex: 2.9,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  circletitle: {
    fontSize: 50,
    fontWeight: 'bold',
  },
  title: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  insideTitle: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 50,
    height: 50,
  },
  icon: {
    width: 200,
    height: 200,
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 10,
  },
  iconView: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  inputStyle: {
    flex: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    fontSize: 20,
    borderWidth: 0,
    borderColor: 'rgba(00, 00, 00, 0.5)',
    textAlign: 'center',
    color: 'black',
    // backgroundColor: 'lightgrey',
  },
  loginBtn: {
    width: 150,
    height: 50,
    marginTop: 10,
    backgroundColor: 'deepskyblue',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    borderColor: 'black',
  },
  background: {
    flex: 1,
    // remove width and height to override fixed static size
    width: null,
    height: null,
  },
});
