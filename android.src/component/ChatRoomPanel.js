import React, { Component } from 'react';
import {
    Image,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Button,
} from 'react-native';
import MarqueeLabel from 'react-native-lahk-marquee-label';

export default class ChatRoomPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {dimensions: undefined};
    this.tagFactory = new this.TagIconFactory();
    this._renderNumofuserIcon = this._renderNumofuserIcon.bind(this);
  }

  render() {
    let room = this.props.room;
    return(
      <View key={room._id} style={{backgroundColor: '#F8F8F8'}}>
        <TouchableOpacity activeOpacity={0.8} onPress={this.props.roomOnClick}>
          <View style={styles.container}>
            <View style={styles.left}>
              {this._renderTagIcon()}
            </View>
            <View style={styles.center}>
              {this._rednerRoomName()}
              {this._showTag()}
            </View>
            <View style={styles.right}>
              <View style={{flexDirection: 'row'}}>
                {room.private ? null : <Text style={{fontSize: 17, color: '#B07267'}}>{room.distance}m</Text>}
                {room.private ? null : this._renderNumofuserIcon()}
              </View>
              <Button style={{flex: 1}}
                color='#4f8ef7'
                title={this.props.btnText}
                onPress={this.props.btnHandler}/>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  _renderNumofuserIcon() {
    let room = this.props.room;
    let showedIcon = null;
    if (room.numUsers < 3){
      showedIcon = require('../../img/fewPeople.png');
    } else if (room.numUsers < 10) {
      showedIcon = require('../../img/couplePeople.png');
    } else if (room.numUsers < 20) {
      showedIcon = require('../../img/severalPeople.png');
    } else {
      showedIcon = require('../../img/dozonPeople.png');
    }
    return(
      <Image resizeMode='contain' source={showedIcon} style={{width: 30, height: 30}}/>
    )
  }

  _rednerRoomName() {
    let room = this.props.room;
    if (this.state.dimensions) {
      let { dimensions } = this.state
      let { width, height } = dimensions

      let lengthOfRoom = (room.name).length
      let lengthOfShow = Math.floor(this.state.dimensions.width/lengthOfRoom)
      if(lengthOfRoom <= 17){
        return (
          <Text
            style={{fontSize: 16, color: '#546979', flex: 2, marginTop: 10}}>
            {room.name}
          </Text>
        )
      }
      else {
        let width = this.state.dimensions.width + this.state.dimensions.width/lengthOfRoom;
        return (
          <View style={{flex: 3, flexDirection: 'row'}}>
            <MarqueeLabel
              textContainerWidth={width}
              duration={8000}
              children={room.name}
              textStyle={{fontSize: 16, color: '#546979', flex: 2, marginTop: 10}}
            />
          </View>
        )
      }
    }
    return (
      <View style={{flex: 1, alignSelf: 'stretch'}} onLayout={this._onLayout}>
        {this.state.dimensions
           ? <Svg width={width} height={height}>
              ...
             </Svg>
           : undefined}
      </View>
    )
  }

  _onLayout = event => {
    if (this.state.dimensions) return // layout was already called
    let {width, height} = event.nativeEvent.layout
    this.setState({dimensions: {width, height}})
  }

  _showTag() {
    let PTags = [];
    for(let i=0; i < this.props.room.tags.length; i++) {
      PTags.push(
        <Text key={i} style={{fontStyle: 'italic', fontSize: 12, color: '#546979'}}>
          #{this.props.room.tags[i]}
        </Text>
      );
    }
    let tagStr = '';
    for(let i=0; i < this.props.room.tags.length; i++) {
      tagStr = tagStr + '#' + this.props.room.tags[i] + ' ';
    }
    if(tagStr.length < 31){
      return (
      <View style = {{flex: 1, marginBottom: 5, flexDirection: 'row'}}>
        {PTags}
      </View>
      );
    }else{
      return (
        <MarqueeLabel
          duration={8000}
          text={tagStr}
          bgViewStyle = {{flex: 1, marginBottom: 5, flexDirection: 'row'}}
          textStyle={{fontStyle: 'italic', fontSize: 12, color: '#546979'}}
        />
      );
    }
  }

  TagIconFactory() {
    this.getTagIcon = function(type) {
      let src;
      switch(type) {
        case 'Food':
          src = require('../../img/food.png');
          break;
        case 'Study':
          src = require('../../img/study.png');
          break;
        case 'Game':
          src = require('../../img/game.png');
          break;
        case 'Sports':
          src = require('../../img/sports.png');
          break;
        case 'private':
          src = require('../../img/private.png');
          break;
        default:
          src = require('../../img/default.png');
      }
      return <Image style={styles.icon} source={src}/>
    };
  }

  _renderTagIcon() {
    return this.tagFactory.getTagIcon(this.props.room.tags[0]);
  }
};

let styles = StyleSheet.create({
  container: {
    height: 70,
    borderColor: '#E2E9EB',
    borderWidth: 1,
    borderRadius: 0.5,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 5,
    marginBottom: 0,
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
