import { useSelector } from 'react-redux';

export const useCurrentChannelId = () => useSelector((state) => state.channels.currentChannelId);

export const useChannels = () => useSelector((state) => state.channels.channels);

export const useMessages = () => useSelector((state) => state.messages.messages);

export const useModal = () => useSelector((state) => state.modals);

export const useCurrentChannelMessages = () => useSelector((state) => state
  .messages
  .messages
  .filter(({ channelId }) => channelId === state.channels.currentChannelId));
