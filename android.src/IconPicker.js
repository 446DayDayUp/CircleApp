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

  _saveIcon(i, imageNames) {
    return(
    <TouchableOpacity
      onPress={
        () => {Actions.pop();
        setTimeout(() =>
        Actions.refresh({icon: this.imagelist[imageNames[i]],
                         iconName: imageNames[i]}), 100)}}>
      <Image source={this.imagelist[imageNames[i]]} style={styles.icon}/>
    </TouchableOpacity>
    )
  }

  renderImages() {
    let imageGrid = [];
    let imageNames = Object.keys(this.imagelist);
    for (let i = 0; i < imageNames.length; i += 3) {
      imageGrid.push(
        <View style={styles.insideview} key={i}>
          {this._saveIcon(i, imageNames)}
          {this._saveIcon(i + 1, imageNames)}
          {this._saveIcon(i + 2, imageNames)}
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
    flex: 1,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
    margin: 5,
  },
  insideview: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  });
