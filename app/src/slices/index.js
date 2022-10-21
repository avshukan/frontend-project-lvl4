import { configureStore } from '@reduxjs/toolkit';
import channelsSlice from './channelsSlice';
import messagesSlice from './messagesSlice';
import modalsSlice from './modalsSlice';

const store = configureStore({
  reducer: {
    channels: channelsSlice,
    messages: messagesSlice,
    modals: modalsSlice,
  },
});

export default store;
