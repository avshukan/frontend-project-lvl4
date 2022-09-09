import React from 'react';
import { useSelector } from 'react-redux';

function MessagesList() {
  const { messages = [], currentChannelId = 0 } = useSelector((state) => state.data);

  return (
    <div id="messages-box" className="chat-messages overflow-auto px-5 ">
      {messages
        .filter(({ channelId }) => channelId === currentChannelId)
        .map(({ id, username, body }) => (
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
