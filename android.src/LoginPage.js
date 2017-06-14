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
  AsyncStorage,
  BackHandler,
  ToastAndroid,
  Alert,
} from 'react-native';
import { profilePicture } from './lib/profilePicture.js';
import SplashScreen from 'react-native-splash-screen';

export default class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      initialIcon: null,
    };
    this.initialIconName = null;
    this._logIn = this._logIn.bind(this);
    this._save = this._save.bind(this);
    this.onBackHandler = this.onBackHandler.bind(this);
  }

  _logIn() {
    if (this.state.userName === '') {
      Alert.alert(
          'Nickname cannot be empty',
          'Please enter your Nickname!',
          [
            {text: 'OK'},
          ]
      );
      return;
    }
    this._save();
    Actions.mainPage({
      userName: this.state.userName ? this.state.userName : this.props.userName,
      iconName: this.props.iconName ? this.props.iconName : this.state.initialIconName,
    });
  }

  _goToIconPage() {
    dismissKeyboard();
    Actions.pickicon();
  }

  componentDidMount() {
    let promises = [];
    promises.push(AsyncStorage.getItem('userName'));
    promises.push(AsyncStorage.getItem('iconName'));
    Promise.all(promises).then(function(result) {
      let userName = result[0];
      let iconName = result[1];
      if (userName === null || iconName === null) {
        this.setState({
          initialIconName: 'pikachu-2',
          initialIcon: require('../img/pikachu-2.png'),
        });
        return;
      }
      this.setState({
        userName,
        initialIconName: iconName,
        initialIcon: profilePicture[iconName],
      });
    }.bind(this)).catch((error) => {
      console.log('error:' + error.message);
    });
    setTimeout(SplashScreen.hide, 1000);
  }

  _save() {
    let userName = this.state.userName;
    let iconName = this.props.iconName ? this.props.iconName : this.state.initialIconName;
    AsyncStorage.setItem('userName', userName);
    AsyncStorage.setItem('iconName', iconName);
  }

  // Add double back to exit app。
  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackHandler);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackHandler);
  }

  onBackHandler() {
    if (this.lastBackPressed && this.lastBackPressed + 2000 >= Date.now()) {
      return false;
    }
    this.lastBackPressed = Date.now();
    ToastAndroid.show('Press back again to exit Circle', ToastAndroid.SHORT);
    return true;
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
                  source={this.props.icon ? this.props.icon : this.state.initialIcon}
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
                value={this.props.userName ? this.props.userName : this.state.userName}
                placeholder= 'Nickname'
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
