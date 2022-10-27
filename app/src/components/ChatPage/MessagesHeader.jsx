import React from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { channelsSelector, currentChannelIdSelector, messagesSelector } from '../../slices';

function MessagesHeader() {
  const channels = useSelector(channelsSelector);

  const currentChannelId = useSelector(currentChannelIdSelector);

  const messages = useSelector(messagesSelector);

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
