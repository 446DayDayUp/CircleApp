exports.blacklist = (function() {
  let blacklist = {'all': {}};
  return {
    checkBlacklist: function(uid, roomId) {
      if (roomId) {
        if (!blacklist[roomId]) {
          blacklist[roomId] = {};
        }
        return blacklist[roomId].hasOwnProperty(uid);
      } else {
        return blacklist['all'].hasOwnProperty(uid);
      }
    },
    modifyBlacklist: function(uid, obj, roomId) {
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
    getBlacklist: function(roomId) {
      if (!roomId) {
        return Object.keys(blacklist['all']).map(
          (uid) => Object.assign({uid}, blacklist['all'][uid]));
      }
      if (!blacklist[roomId]) return [];
      return Object.keys(blacklist[roomId]).map(
          (uid) => {
            let a = Object.assign({uid}, blacklist[roomId][uid])
            return a;
          })
    },
  }
})();
