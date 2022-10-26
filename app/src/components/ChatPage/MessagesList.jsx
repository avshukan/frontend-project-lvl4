import React, { useRef, useEffect } from 'react';
import { useCurrentChannelMessages } from '../../slices';

function MessagesList() {
  const channelMessages = useCurrentChannelMessages();

  const ref = useRef();

  useEffect(() => {
    const height = [...(ref.current?.childNodes ?? [])]
      .map((child) => child.offsetHeight)
      .reduce((acc, value) => acc + value, 0);
    ref.current?.scrollTo(0, height);
  }, [channelMessages]);

  return (
    <div ref={ref} className="overflow-auto px-5">
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
