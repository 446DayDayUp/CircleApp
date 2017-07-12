import Sound from 'react-native-sound';
var player = null;

let audioPlayer = function() {
  let currSound = null;
  let currUrl = '';
  this.play = (url) => {
    if (currSound) {
      currSound.stop();
      currSound.release();
    }
    if (currUrl === url) {
      currUrl = '';
      return;
    }
    currSound = new Sound(url, '', (err, duration) => {
      currUrl = url;
      currSound.play(() => {
        currSound.release();
        currSound = null;
        currUrl = '';
      })});
  }

  this.getDuration = (url, cb) => {
    let sound = new Sound(url, '', (err, duration) => {
      console.warn('in audioPlayer: ', sound.getDuration());
      cb(sound.getDuration());
    });
  }

  this.stop = () => {
    if (currSound) {
      currSound.stop();
      currSound.release();
      currSound = null;
    }
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
