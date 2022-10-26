import React from 'react';
import { useTranslation } from 'react-i18next';
import { useChannels, useCurrentChannelId, useMessages } from '../../slices';

function MessagesHeader() {
  const channels = useChannels();

  const currentChannelId = useCurrentChannelId();

  const messages = useMessages();

  const { t } = useTranslation();

  const { name = '' } = channels.find(({ id }) => id === currentChannelId) ?? {};

  const messagesCount = messages.filter(({ channelId }) => channelId === currentChannelId).length;

  return (
    <div className="bg-light mb-4 p-3 shadow-sm small">
      <p className="m-0"><b>{`# ${name}`}</b></p>
      <span className="text-muted">{t('messagesHeader.messages', { count: messagesCount })}</span>
    </div>
  );
}

export default MessagesHeader;
