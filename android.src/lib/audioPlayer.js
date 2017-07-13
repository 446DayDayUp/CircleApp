import Sound from 'react-native-sound';
var player = null;

let audioPlayer = function() {
  let currSound = null;
  this.play = (url) => {
    if (currSound) {
      currSound.stop();
      currSound.release();
    }
    currSound = new Sound(url, '', (err, duration) => {
      currSound.play(() => {
        currSound.release();
        currSound = null;
      })});
  }
  this.getDuration = (url, cb) => {
    let sound = new Sound(url, '', (err, duration) => {
      console.warn('in audioPlayer: ', sound.getDuration());
      cb(sound.getDuration());
    });
  }
}

exports.SingletonPlayer = (function() {
  let player;

  function createInstance() {
    return new audioPlayer();
  }

  return {
    getInstance: function(url) {
      if (!player) {
        player = createInstance();
      }
      return player;
    }
  }
})();
