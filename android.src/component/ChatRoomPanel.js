import React, { Component } from 'react';
import {
    Image,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Button,
} from 'react-native';

export default class ChatRoomPanel extends Component {
    render() {
        let room = this.props.room;
       return(
            <View key={room._id} style={{backgroundColor: '#F8F8F8'}}>
              <TouchableOpacity activeOpacity={0.8}>
                <View style={styles.container}>
                  <View style={styles.left}>
                      {this._chooseTag()}
                  </View>
                  <View style={styles.center}>
                    <Text style={{fontSize: 16, color: '#546979'}}>
                        {room.name} ({room.numUser})
                    </Text>
                    <Text style={{fontSize: 16, color: '#546979'}}>{room.tags[1]}</Text>
                  </View>
                  <View style={styles.right}>
                    <Text style={{fontSize: 17, color: '#B07267'}}>{room.distance}m</Text>
                    <Button style={{flex: 1}}
                            color='gainsboro'
                            title={this.props.btnText}
                            onPress={this.props.btnHandler}/>
                  </View>
                </View>
              </TouchableOpacity>


            </View>
        );
    }
    onClick() {

    }

on
    _chooseTag() {
        if (this.props.room.tags[0] == 'food') {
            return ( <Image style={styles.icon} source={require('../../img/food.png')}/>);
        }else if (this.props.room.tags[0] == 'study') {
            return (<Image style={styles.icon} source={require('../../img/study.png')}/>);
        }else if (this.props.room.tags[0] == 'game') {
            return (<Image style={styles.icon} source={require('../../img/game.png')}/>);
        }else if (this.props.room.tags[0] == 'sports') {
            return (<Image style={styles.icon} source={require('../../img/sports.png')}/>);
        }else{
            return (<Image style={styles.icon} source={require('../../img/default.png')}/>);
        }
    }
};

var styles = StyleSheet.create({
    container: {
        height: 70,
        borderColor: '#E2E9EB',
        borderWidth: 1,
        borderRadius: 0.5,
        marginLeft: 5,
        marginRight: 5,
        marginTop: 10,
        marginBottom: 5,
        backgroundColor: '#FFF',
        flexDirection: 'row',
    },
    close: {
        width: 22,
        height: 22,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        flex: 1,
        bottom: 55,
        left: 2,
        right: 0,
        position: 'absolute',
    },
    icon: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    left: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    center: {
        flex: 3,
        justifyContent: 'center',
    },
    right: {
        flex: 1.5,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
