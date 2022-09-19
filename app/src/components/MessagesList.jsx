import React from 'react';
import { useSelector } from 'react-redux';

function MessagesList() {
  const channelMessages = useSelector((state) => state
    .data
    .messages
    .filter(({ channelId }) => channelId === state.data.currentChannelId));

  return (
    <div id="messages-box" className="chat-messages overflow-auto px-5 ">
      {channelMessages.map(({ id, username, body }) => (
        <div key={id} className="text-break mb-2">
          <b>{username}</b>
          :
          {' '}
          {body}
        </div>
      ))}
    </div>
  );
}

export default MessagesList;
