/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import fetchDataThunk from './fetchDataThunk';

const defaultChannelId = 1;

const initialState = {
  channels: [],
  currentChannelId: defaultChannelId,
};

const dataSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    addChannel: (state, action) => {
      state.channels.push(action.payload);
    },
    switchChannel: (state, action) => {
      const { channelId } = action.payload;
      state.currentChannelId = channelId;
    },
    renameChannel: (state, action) => {
      const { id, name } = action.payload;
      state.channels.find((channel) => channel.id === id).name = name;
    },
    removeChannel: (state, action) => {
      const { id: removedChannelId } = action.payload;
      state.channels = state.channels
        .filter(({ id }) => id !== removedChannelId);
      if (state.currentChannelId === removedChannelId) {
        state.currentChannelId = defaultChannelId;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDataThunk.fulfilled, (state, action) => {
        const { channels, currentChannelId } = action.payload;
        state.channels = channels;
        state.currentChannelId = currentChannelId;
      });
  },
});

export const {
  addChannel,
  switchChannel,
  renameChannel,
  removeChannel,
} = dataSlice.actions;

export default dataSlice.reducer;
