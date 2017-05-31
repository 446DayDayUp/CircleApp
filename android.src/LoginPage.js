import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity
} from 'react-native';

export default class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {text: ''};
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
            <Image source={require('../img/jigglypuff.png')} style={styles.icon}/>
          </View>
          <TextInput
            style={styles.textInputStyle}
            placeholder="Type here to translate!"
            onChangeText={(text) => this.setState({text})}
          />
          <TouchableOpacity style={styles.btn}>
            <Text style={styles.text}>login</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    //justifyContent: 'center',
    //alignItems: 'center',
    backgroundColor: 'white',
  },
  bottom: {
    flex: 2,
    flexDirection: 'column',
    //justifyContent: 'center',
    //alignItems: 'center'
  },
  circletitle: {
    //flex: 1,
    fontSize: 50,
    fontWeight: 'bold',
    // marginLeft: 110
    paddingTop: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
  },
  title: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  insideTitle: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo:{
    //flex: 1,
    width: 80,
    height: 80,
    //resizeMode: 'stretch',
  },
  icon: {
    width: 200,
    height: 200,
    border: 10,
  },
  textInputStyle: {
    flex: 5,
    marginRight: 10,
    fontSize: 18,
    marginTop: 4
  },
  iconView: {
    flexDirection: 'column',
    alignItems: 'center',
  },
});
