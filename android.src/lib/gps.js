let lat = null;
let lng = null;
let highAccurecy = {
  enableHighAccuracy: true,
  timeout: 3000,
};

let fastMode = {
  enableHighAccuracy: false,
  timeout: 3000,
}

let getCords = (opt) => {
  opt = opt || fastMode;
  return new Promise((resolve) => {
    return navigator.geolocation.getCurrentPosition(function(location) {
      lat = location.coords.latitude;
      lng = location.coords.longitude;
      resolve({lat, lng});
    }, function(err) {
      if (lat === null || lng === null) {
        console.warn('Get GPS failed, retrying!!!');
        resolve(getCords());
      } else {
        // If timeout, use previous avaiblable GPS cords.
        resolve({lat, lng});
      }
    }, opt);
  })
};

exports.getGpsCord = () => {
  // Get current location.
  return getCords(highAccurecy);
}
