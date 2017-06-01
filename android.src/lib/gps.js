let lat = null;
let lng = null;

let getCords = () => {
  return new Promise((resolve) => {
    return navigator.geolocation.getCurrentPosition(function(location) {
      lat = location.coords.latitude;
      lng = location.coords.longitude;
      resolve({lat, lng});
    }, function(err) {
      if (lat === null || lng === null) {
        resolve(getCords());
      } else {
        // If timeout, use previous avaiblable GPS cords.
        resolve({lat, lng});
      }
    }, {
      enableHighAccuracy: true,
      timeout: 3000,
    });
  })
};

exports.getGpsCord = () => {
  // Get current location.
  return getCords();
}
