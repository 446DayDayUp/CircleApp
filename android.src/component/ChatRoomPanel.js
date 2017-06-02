import React, { Component } from 'react';
import {
  Text,
  View,
  Button,
  StyleSheet,
} from 'react-native';

export default class ChatRoomPanel extends Component {
  render() {
    let room = this.props.room;
    return(
      <View key={room._id} style={styles.panel}>
        <View style={{flex: 2}}>
          <Text>{room.name} ({room.numUser})</Text>
          <Text>{room.distance}m</Text>
          <Text style={{fontStyle: 'italic'}}>
            {room.tags.map((tag) => tag)}
          </Text>
        </View>
        {this.props.btnText ?
          <Button style={{flex: 1}}
            title={this.props.btnText}
            onPress={this.props.btnHandler}/>
          : null}
      </View>
      );
  }
};

const styles = StyleSheet.create({
  panel: {
    flexDirection: 'row',
    borderWidth: 0.5,
    borderRadius: 5,
    padding: 5,
    margin: 2,
  },
});

