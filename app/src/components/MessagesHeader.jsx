import React from 'react';
import { useSelector } from 'react-redux';

function MessagesHeader() {
  const { channels, messages, currentChannelId } = useSelector((state) => state.data);

  const { name = '' } = channels.find(({ id }) => id === currentChannelId) ?? {};

  const messagesCount = messages.filter(({ channelId }) => channelId === currentChannelId).length;

  return (
    <div className="bg-light mb-4 p-3 shadow-sm small">
      <p className="m-0"><b>{`# ${name}`}</b></p>
      <span className="text-muted">{`${messagesCount} сообщ`}</span>
    </div>
  );
}

export default MessagesHeader;
