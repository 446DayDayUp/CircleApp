function degToRad(deg) {
   return deg * Math.PI / 180;
};

function radToDeg(rad) {
   return rad * 180 / Math.PI;
};

function kmToLatDeg(km) {
  return km / 110.54;
};

function kmToLngDeg(km, lat) {
  return km / (111.320 * Math.cos(degToRad(lat)));
};

// range: in meters
exports.getSquireCord = (lat, lng, range) => {
  let km = range / 1000;
  let top = lat + kmToLatDeg(km);
  let btm = lat - kmToLatDeg(km);
  let rgt = lng + kmToLngDeg(km, lat);
  let lft = lng - kmToLngDeg(km, lat);
  return {top, btm, rgt, lft};
};

exports.mBetweenCoords = (lat1, lon1, lat2, lon2) => {
  let earthRadiusInM = 6371000;

  let diffLat = degToRad(lat2 - lat1);
  let diffLon = degToRad(lon2 - lon1);

  lat1 = degToRad(lat1);
  lat2 = degToRad(lat2);

  let a = Math.sin(diffLat/2) * Math.sin(diffLat/2) +
          Math.sin(diffLon/2) * Math.sin(diffLon/2) * Math.cos(lat1) * Math.cos(lat2);
  let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return earthRadiusInM * c;
};