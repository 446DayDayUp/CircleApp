import React, { Component } from 'react';

import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  Picker,
  Button,
  TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Tags from './component/Tags.js';
import * as http from './lib/http.js';
import { getGpsCord } from './lib/gps.js';

const Item = Picker.Item;
const SERVER_URL = 'http://chat.herokuapp.com/';

export default class CreateChat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '', // Chat room name
            range: '1km', // Chat room range
            tags: [], // Chat room tags
            selectedTags: 'Please select your tags', // Display tags as string
            show: false // Whether to show tags or not
        }
    }

    // Show or hide tags
    showOrHide() {
      this.setState({
        show: !this.state.show
      });
    }

    // Show tags from Tags component
    showTags() {
      return <Tags passTags = {this.getTags} />;
    }

    // Return selected tags as string
    getSelectedTags() {
      return this.state.selectedTags
    }

    // Callback func to get selected tags from Tags component
    getTags = (t) => {
        this.setState({
          tags: t
        });
        if (this.state.tags.length > 0) {
          this.setState({
            selectedTags: this.state.tags.toString()
          })
        } else {
          this.setState({
            selectedTags: 'Please select your tags'
          })
        }
    }

    submit() {
      return;
    }

    render() {
        return (
            <View style = {styles.all}>
                <View style = {styles.container}>
                    <View>
                        <View style = {styles.infoLine}>
                            <Text style = {styles.title}> Name </Text>
                            <TextInput
                                style = {styles.content}
                                placeholder = 'Please enter your chat room name here'
                                onChangeText = {(name) => this.setState({name: name})}
                            />
                        </View>
                        <View style = {styles.infoLine}>
                            <Text style = {styles.title}> Range </Text>
                            <Picker style = {styles.content}
                                    selectedValue = {this.state.range}
                                    onValueChange = {(range) => this.setState({range: range})}>
                                <Item label = '100m' value = '100m' />
                                <Item label = '500m' value = '500m' />
                                <Item label = '1km' value = '1km' />
                                <Item label = '5km' value = '5km' />
                                <Item label = '10km' value = '10km' />
                            </Picker>
                        </View>
                        <View style = {styles.infoLine}>
                            <Text style = {styles.title}> Tags </Text>
                            <View  style = {{flex: 2, height: 50, flexDirection: 'row'}}>
                                <TextInput style = {{flex: 3}}
                                    placeholder = {this.getSelectedTags()}
                                    editable = {false}
                                />
                                <TouchableOpacity onPress = {() => this.showOrHide()}>
                                    {!this.state.show ? <Icon name = 'ios-arrow-down' size = {40} color = '#4f8ef7' />
                                                      : <Icon name = 'ios-arrow-up' size = {40} color = '#4f8ef7' />}
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    {this.state.show ? this.showTags() : null}
                    <View style = {{flexDirection: 'row', marginBottom: 30}}>
                        <View style = {{flex: 1}}></View>
                        <View style = {styles.button}>
                            <Button title = 'Submit'
                                    onPress = {() => this.submit()} />
                        </View>
                        <View style = {{flex: 1}}></View>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    all: {
      flex: 1,
      backgroundColor: '#ffffff'
    },
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
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
        fontWeight: 'bold'
    },
    content: {
        flex: 2,
        height: 50,
    },
    horizontalLine: {
        flex: 1,
        height: 0.3,
        backgroundColor: 'darkgray',
    },
})