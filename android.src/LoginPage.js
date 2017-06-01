import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  Button,
} from 'react-native';

export default class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.initialIcon = require('../img/jigglypuff.png');
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.title}>
          <View style={styles.insideTitle}>
            <Text style={styles.circletitle}>Circle</Text>
            <Image source={require('../img/logo.png')} style={styles.logo}/>
          </View>
        </View>

        <View style={styles.bottom}>
          <View style={styles.iconView}>
            <TouchableOpacity onPress={Actions.pickicon}>
              <Image
                source={this.props.icon ? this.props.icon : this.initialIcon}
              onPress={() => console.warn('pressed')}
              style={styles.icon} />
            </TouchableOpacity>
          </View>

          <View
            style={{flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center'}}>
            <View style={{flex: 1}}></View>
            <TextInput
              underlineColorAndroid='rgba(0,0,0,0)'
              style={styles.inputStyle}
              placeholder="Set Nickname!"
              onChangeText={(text) => this.setState({text})}
            />
            <View style={{flex: 1}}></View>
          </View>


          <Button
            onPress={() => {}}
            title="Login"
            // accessibilityLabel="Learn more about this purple button"
          />

        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  bottom: {
    flex: 2,
    flexDirection: 'column',
    justifyContent: 'space-between',
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
    flex: 2,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    fontSize: 20,
    borderWidth: 1,
    borderColor: 'black',
  },
});
