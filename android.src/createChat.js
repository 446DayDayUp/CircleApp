import React, { Component } from 'react';

import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Picker,
  Button,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Tags from './component/Tags.js';
import * as http from './lib/http.js';
import { getGpsCord } from './lib/gps.js';

const Item = Picker.Item;
const SERVER_URL = 'https://circle-chat.herokuapp.com';

export default class CreateChat extends Component {
  // Constructor
  constructor(props) {
    super(props);
      this.state = {
        name: 'Please enter your chat room name', // Chat room name
        range: '1000', // Chat room range
        tags: [], // Chat room tags
        selectedTags: 'Please select your tags', // Display tags as string
        show: false, // Whether to show tags or not
      };
      this.submit = this.submit.bind(this);
  }

  // Show or hide tags
  showOrHide() {
    this.setState({
      show: !this.state.show,
    });
  }

  // Show tags from Tags component
  showTags() {
    return <Tags passTagsFromTagsComp = {this.getTags.bind(this)}
                  passTagsToTagsComp = {this.state.tags} />;
  }

  // Return selected tags as string
  getSelectedTags() {
    return this.state.selectedTags;
  }

  // Callback func to get selected tags from Tags component
  getTags(t) {
    this.setState({
      tags: t,
    });
    if (this.state.tags.length > 0) {
      this.setState({
        selectedTags: this.state.tags.toString(),
      });
    } else {
      this.setState({
        selectedTags: 'Please select your tags',
      });
    }
  }

  // Submit room info to server
  submit() {
      getGpsCord().then(function(location) {
          http.post(SERVER_URL, 'create-chat-room', {
            name: this.state.name,
            tags: this.state.tags,
            range: this.state.range,
            lat: location.lat,
            lng: location.lng,
          }).then(function() {
            this.state.name = 'Please enter your chat room name';
            this.state.range = '1000';
            tags = [];
            selectedTags = 'Please select your tags';
            // this.props.updateRooms();
          }.bind(this)).catch(function(error) {
            console.log('error', error);
          });
      }.bind(this));
  }

  // Render view
  render() {
    return (
      <View style = {styles.all}>
        <View style = {styles.container}>
          <View>
            <View style = {styles.infoLine}>
              <Text style = {styles.title}> Name </Text>
              <TextInput
                style = {styles.content}
                placeholder = {this.state.name}
                onChangeText = {(name) => this.setState({name: name})}
              />
            </View>
            <View style = {styles.infoLine}>
              <Text style = {styles.title}> Range </Text>
              <Picker
                style = {styles.content}
                selectedValue = {this.state.range}
                onValueChange = {(range) => this.setState({range: range})}>
                <Item label = '50m' value = '50' />
                <Item label = '100m' value = '200' />
                <Item label = '500m' value = '500' />
                <Item label = '1km' value = '1000' />
                <Item label = '5km' value = '5000' />
                <Item label = '10km' value = '10000' />
              </Picker>
            </View>
            <View style = {styles.infoLine}>
              <Text style = {styles.title}> Tags </Text>
              <View style = {styles.tagLine}>
                <TextInput style = {styles.tagInfo}
                           placeholder = {this.getSelectedTags()}
                           editable = {false}
                />
                <TouchableOpacity onPress = {() => this.showOrHide()}>
                  {!this.state.show ? <Icon
                                        name = 'ios-arrow-down'
                                        size = {40}
                                        color = '#4f8ef7' />
                                    : <Icon
                                        name = 'ios-arrow-up'
                                        size = {40}
                                        color = '#4f8ef7' />
                  }
                </TouchableOpacity>
              </View>
            </View>
          </View>
          {this.state.show ? this.showTags() : null}
          <View style = {styles.buttonView}>
            <View style = {styles.emptyView}></View>
            <View style = {styles.button}>
              <Button title = 'Submit'
                      onPress = {() => this.submit()} />
            </View>
            <View style = {styles.emptyView}></View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  all: {
    flex: 1,
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    marginLeft: 10,
    marginRight: 10,
    justifyContent: 'space-between',
  },
  infoLine: {
    alignItems: 'center',
    height: 50,
    flexDirection: 'row',
  },
  button: {
    flex: 1.5,
    height: 50,
    justifyContent: 'flex-end',
  },
  title: {
    flex: 1,
    fontSize: 19,
    fontWeight: 'bold',
  },
  content: {
    flex: 2,
    height: 50,
  },
  tagLine: {
    flex: 2,
    height: 50,
    flexDirection: 'row',
  },
  tagInfo: {
    flex: 3,
  },
  buttonView: {
    flexDirection: 'row',
    marginBottom: 30,
  },
  emptyView: {
    flex: 1,
  },
});
