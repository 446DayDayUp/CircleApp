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
        return blacklist[roomId].indexOf(uid) !== -1;
      } else {
        return blacklist['all'].indexOf(uid) !== -1;
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
      let index = blacklist[room].indexOf(uid);
      if (index === -1) {
        blacklist[room][uid] = obj;
      } else {
        delete blacklist[room][uid];
      }
    },
  }
})();
