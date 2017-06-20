/**
 * Created by zachary on 2017-06-19.
 */
import React, { Component } from 'react';

import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  PixelRatio,
} from 'react-native';

let { width } = Dimensions.get('window');

const icons = [
  require('../../img/ic_more_gallery.png'),
  require('../../img/ic_more_movie.png'),
  require('../../img/ic_more_position.png'),
  require('../../img/small_game.png'),
];

const iconTexts = [
  'photo', 'video', 'location', 'game',
];

export default class MoreView extends Component {
  render() {
    let parts = [];
    for (let i = 0; i < 4; i++) {
        parts.push(
          <Cell
            key={i}
            icon={icons[i]}
            text={iconTexts[i]}
          />
        );
      }
    return (
      <View style={styles.moreViewContainer}>
        {parts}
      </View>
    );
  }
}

class Cell extends Component {
  render() {
    return (
      <View style={styles.cellContainer}>
        <View style={styles.cellImgContainer}>
          <Image style={styles.cellImage} source={this.props.icon} />
        </View>
        <Text style={styles.cellText}>{this.props.text}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  moreViewContainer: {
    width: width,
    height: 100,
    flexDirection: 'row',
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: '#F4F4F4'
  },
  cellContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 10,
  },
  cellImgContainer: {
    width: 55,
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FBFBFB',
    borderWidth: 1 / PixelRatio.get(),
    borderColor: '#DFDFDF',
    borderRadius: 10,
  },
  cellImage: {
    width: 35,
    height: 35,
  },
  cellText: {
    fontSize: 13,
  }
});
