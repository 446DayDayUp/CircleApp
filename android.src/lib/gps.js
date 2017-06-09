import {
  NativeModules,
} from 'react-native';
var Geolocation  = NativeModules.Geolocation;

exports.getGpsCord = () => {
  return Geolocation.getCurrentLocation();
}
