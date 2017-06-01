import { Actions } from 'react-native-router-flux';
import React, { Component } from 'react';
import { profilePicture } from './lib/profilePicture.js';
import {
  StyleSheet,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';

export default class IconPicker extends Component {

  constructor(props) {
    super(props);
    this.state = {text: ''};
    this.imagelist = profilePicture;
  }

  renderImages() {
    let imageGrid = [];
    let imageNames = Object.keys(this.imagelist);
    for (let i = 0; i < imageNames.length; i += 3) {
      imageGrid.push(
        <View style={styles.insideview} key={i}>
          <TouchableOpacity
            onPress={
              () => Actions.login({icon: this.imagelist[imageNames[i]],
                iconName: imageNames[i]})}>
            <Image source={this.imagelist[imageNames[i]]} style={styles.icon}/>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={
              () => Actions.login({icon: this.imagelist[imageNames[i + 1]],
              iconName: imageNames[i]})}>
            <Image
              source={this.imagelist[imageNames[i + 1]]} style={styles.icon}/>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={
              () => Actions.login({icon: this.imagelist[imageNames[i + 2]],
              iconName: imageNames[i]})}>
            <Image
              source={this.imagelist[imageNames[i + 2]]} style={styles.icon}/>
          </TouchableOpacity>
        </View>
      );
    }
    return imageGrid;
  }

  render() {
    return (
      <ScrollView>
          {this.renderImages()}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  icon: {
    width: 120,
    height: 120,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
    margin: 10,
  },
  insideview: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  });
