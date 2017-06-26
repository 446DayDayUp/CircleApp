const DeviceInfo = require('react-native-device-info');
let uid = DeviceInfo.getUniqueID();

exports.SERVER_URL = 'https://circle-chat.herokuapp.com';
exports.UID = uid;
