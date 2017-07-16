import React, { Component } from 'react';
import {
	StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  Modal,
  ScrollView,
} from 'react-native';
import MapView from 'react-native-maps';
import Icon from 'react-native-vector-icons/Ionicons';
import { profilePicture } from '../../lib/profilePicture.js';
import { listItemStyle } from '../../css/MessageCSS.js';
import ProfileView from '../ProfileView.js';

export default class LocationMessage extends Component {
  constructor(props) {
    super(props);
    this.zoom = this.zoom.bind(this);
    this.state = {
      showPicture: false,
      showMap: false,
    }
  }

  zoom(bool) {
    this.setState({
      showMap: bool,
    })
  }

  render() {
    let msg = this.props.msg;
    if (!this.props.isSend) {
      return (
        <View>
          <ProfileView showProfile={this.state.showProfile}
            hideProfile={() => this.setState({showProfile: false})}
            msg={msg}/>
          <Modal
            animationType={'fade'}
            transparent={false}
            visible={this.state.showMap}
            onRequestClose={() => this.zoom(false)}>
            <View style={styles.zoomInContainer}>
            	<MapView style={styles.zoomInMap}
         	  		initialRegion={{
       	    			latitude: msg.opt.lat,
             			longitude: msg.opt.lng,
             			latitudeDelta: 0.0035,
             			longitudeDelta: 0.0035,
             		}}>
             		<MapView.Marker
      						coordinate={{'latitude': msg.opt.lat, 'longitude': msg.opt.lng}}
      						title={msg.userName}
    						/>
    					</MapView>
            </View>
          </Modal>
          <View style={listItemStyle.container}>
            <TouchableOpacity
              style={listItemStyle.iconView}
              onPress={() => {this.setState({showProfile: true})}}>
              <Image
                style={listItemStyle.iconImageView}
                source={profilePicture[msg.iconName]} />
            </TouchableOpacity>
            <View style={{width: 200, height: 200}}>
              <Text> {msg.userName} </Text>
              <TouchableOpacity onPress={() => this.zoom(true)} style ={styles.container}>
                <MapView style={styles.map} zoomEnabled={false} rotateEnabled={false} scrollEnabled={false} pitchEnabled={false} toolbarEnabled={false} cacheEnabled={true}
              		initialRegion={{
              			latitude: msg.opt.lat,
              			longitude: msg.opt.lng,
              			latitudeDelta: 0.035,
              			longitudeDelta: 0.035,
              		}}>
              			<MapView.Marker
      								coordinate={{'latitude': msg.opt.lat, 'longitude': msg.opt.lng}}
      								title={msg.userName}
    								/>
    						</MapView>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      );
    } else {
      return (
        <View style={listItemStyle.containerSend}>
          <Modal
            animationType={'fade'}
            transparent={false}
            visible={this.state.showMap}
            onRequestClose={() => this.zoom(false)}>
            <View style={styles.zoomInContainer}>
            	<MapView style={styles.zoomInMap}
         	  		initialRegion={{
       	    			latitude: msg.opt.lat,
             			longitude: msg.opt.lng,
             			latitudeDelta: 0.0035,
             			longitudeDelta: 0.0035,
             		}}>
             		<MapView.Marker
      						coordinate={{'latitude': msg.opt.lat, 'longitude': msg.opt.lng}}
      						title={msg.userName}
    						/>
    					</MapView>
            </View>
          </Modal>
          <View style={{width: 200}}>
            <View style={{alignItems: 'flex-end'}}>
              <Text> {msg.userName} </Text>
            </View>
            <View style={{width: 200, height: 200}}>
              <TouchableOpacity onPress={() => this.zoom(true)} style ={styles.container}>
                <MapView style={styles.map} zoomEnabled={false} rotateEnabled={false} scrollEnabled={false} pitchEnabled={false} toolbarEnabled={false} cacheEnabled={true}
              		initialRegion={{
              			latitude: msg.opt.lat,
              			longitude: msg.opt.lng,
              			latitudeDelta: 0.035,
              			longitudeDelta: 0.035,
              		}}>
              			<MapView.Marker
      								coordinate={{'latitude': msg.opt.lat, 'longitude': msg.opt.lng}}
      								title={msg.userName}
    								/>
    						</MapView>
              </TouchableOpacity>
            </View>
          </View>
          <Image style={listItemStyle.iconView} source={profilePicture[msg.iconName]} />
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
   	justifyContent: 'flex-end',
   	alignItems: 'center',
   	width: 200,
   	height: 200,
 	},
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: 200,
    height: 200,
  },
  zoomInContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
   	justifyContent: 'flex-end',
   	alignItems: 'center',
 	},
  zoomInMap: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flex: 1,
  },
});

