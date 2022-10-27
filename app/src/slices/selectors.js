export const currentChannelIdSelector = (state) => state.channels.currentChannelId;

export const channelsSelector = (state) => state.channels.channels;

export const messagesSelector = (state) => state.messages.messages;

export const modalSelector = (state) => state.modals;

export const currentChannelMessagesSelector = (state) => state
  .messages
  .messages
  .filter(({ channelId }) => channelId === state.channels.currentChannelId);
