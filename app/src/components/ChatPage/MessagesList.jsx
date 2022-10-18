import React from 'react';
import { useSelector } from 'react-redux';
import filter from 'leo-profanity';

function MessagesList() {
  const channelMessages = useSelector((state) => state
    .messages
    .messages
    .filter(({ channelId }) => channelId === state.channels.currentChannelId));

  return (
    <div id="messages-box" className="chat-messages overflow-auto px-5" style={{ maxHeight: '100%' }}>
      {channelMessages.map(({ id, username, body }) => (
        <div key={id} className="text-break mb-2">
          <b>{username}</b>
          :
          {' '}
          {filter.clean(body)}
        </div>
      ))}
    </div>
  );
}

export default MessagesList;
