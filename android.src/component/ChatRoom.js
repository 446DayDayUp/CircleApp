import React, { Component } from 'react';
import {
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';

class ChatRoomList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      text: '',
    };
    this.sendMsg = this.sendMsg.bind(this);
    this.props.socket.on('chat', function(sid, msg){
      this.setState({
        messages: [...this.state.messages, msg],
      });
    }.bind(this));
  }

  sendMsg() {
    this.props.socket.emit('chat', this.props.roomId, this.state.text);
    this.setState({
      text: '',
    });
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <Text>{this.props.name}</Text>
        <ScrollView>
          {this.state.messages.map((msg, i) => <Text key={i}>{msg}</Text>)}
        </ScrollView>
        <View style={{flexDirection: 'row', position: 'absolute', bottom: 0}}>
          <TextInput
            style={{flex: 5}}
            value={this.state.text}
            onChangeText={(text) => this.setState({text})}
          />
          <TouchableOpacity style={{flex: 1}} onPress={this.sendMsg}>
            <Text>Send</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default ChatRoomList;
