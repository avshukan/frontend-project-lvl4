import React from 'react';
import { useCurrentChannelMessages } from '../../slices';

function MessagesList() {
  const channelMessages = useCurrentChannelMessages();

  return (
    <div className="overflow-auto px-5">
      {channelMessages.map(({ id, username, body }) => (
        <div key={id} className="text-break mb-2">
          <b>{username}</b>
          {`: ${body}`}
        </div>
      ))}
    </div>
  );
}

export default MessagesList;
