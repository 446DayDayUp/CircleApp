exports.blacklist = (function() {
  let blacklist = null;
  return {
    checkBlacklist: function(uid, roomId) {
      if (!blacklist) {
        blacklist = {'all': []};
      }
      if (roomId) {
        if (!blacklist[roomId]) {
          blacklist[roomId] = [];
        }
        return blacklist[roomId].hasOwnProperty(uid);
      } else {
        return blacklist['all'].hasOwnProperty(uid);
      }
    },
    modifyBlacklist: function(uid, obj, roomId) {
      if (!blacklist) {
        blacklist = {'all': {}};
      }
      let room = null;
      if (roomId) {
        if (!blacklist[roomId]) {
          blacklist[roomId] = {};
        }
        room = roomId;
      } else {
        room = 'all';
      }
      if (blacklist[room][uid]) {
        delete blacklist[room][uid];
      } else {
        blacklist[room][uid] = obj;
      }
    },
  }
})();
