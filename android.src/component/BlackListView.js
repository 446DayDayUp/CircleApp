import React, { Component } from 'react';
import {
  Text,
  View,
  Modal,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import CheckBox from 'react-native-check-box';
import { profilePicture } from '../lib/profilePicture.js';
import { blacklist } from '../lib/blacklist.js';

export default class BlackListView extends Component {
  constructor(props) {
    super(props);
    this.renderBlacklist = this.renderBlacklist.bind(this);
  }

  renderBlacklist(user, roomId) {
    return(
      <View key={user.uid + roomId} style={styles.row}>
        <Image source={profilePicture[user.iconName]}
          style={styles.imageView}/>
        <CheckBox
          style={{paddingLeft: 30}}
          onClick={() => blacklist.modifyBlacklist(user.uid, {
            userName: user.userName,
            iconName: user.iconName,
          }, roomId)}
          isChecked={blacklist.checkBlacklist(user.uid, roomId)}
          leftText={user.userName}/>
      </View>
        );
  }

  render() {
    return (
      <Modal
        animationType={"slide"}
        transparent={false}
        visible={this.props.showBlacklist}
        onRequestClose={this.props.hideBlacklist}
        >
        <View style={styles.headerView}>
          <TouchableOpacity
            onPress={this.props.hideBlacklist}
            style={{paddingLeft: 10}}>
            <Icon name='ios-arrow-back'
              size={40}
              color='white'
            />
          </TouchableOpacity>
        </View>
        <ScrollView>
          <Text>Blacklist in this room</Text>
          {blacklist.getBlacklist(this.props.roomId)
              .map((user) => this.renderBlacklist(user, this.props.roomId))}
          <Text>Blacklist in all chats</Text>
          {blacklist.getBlacklist().map(this.renderBlacklist)}
        </ScrollView>
      </Modal>
      );
  }
}


export const styles = StyleSheet.create({
  headerView: {
    height: 40,
    backgroundColor: '#4f8ef7',
    flexDirection: 'row'
  },
  largeText: {
    fontSize: 30,
    fontWeight: 'bold',
    padding: 10,
  },
  imageView: {
    width: 30,
    height: 30,
    position: 'absolute'
  },
  row: {
    padding: 10
  }
});
