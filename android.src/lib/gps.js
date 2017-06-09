import {
  NativeModules,
  Alert,
} from 'react-native';
var Geolocation  = NativeModules.Geolocation;

exports.getGpsCord = () => {
  return Geolocation.getCurrentLocation()
    .catch((e) => {
      Alert.alert(
        'GPS not avalaible',
        'Please turn on GPS service.',
        [],
        { cancelable: true }
      );
      throw e;
    });
}
