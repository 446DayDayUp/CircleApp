import React from 'react';
import AudioMessage from './AudioMessage.js';
import ImageMessage from './ImageMessage.js';
import NoticeMessage from './NoticeMessage.js';
import TextMessage from './TextMessage.js';
import VideoMessage from './VideoMessage.js';

exports.createMessage = function(message, isSend) {
  switch (message.type) {
    case 'chat':
      return <TextMessage msg={message} isSend={isSend}/>;
    case 'audio':
      return <AudioMessage msg={message} isSend={isSend}/>;
    case 'image':
      return <ImageMessage msg={message} isSend={isSend}/>;
    case 'video':
      return <VideoMessage msg={message} isSend={isSend}/>;
    case 'notice':
      return <NoticeMessage msg={message} isSend={isSend}/>;
    default:
      return null;
  }
}
