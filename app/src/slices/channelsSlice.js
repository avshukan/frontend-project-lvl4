import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import fetchDataThunk from './fetchDataThunk';
import routes from '../routes/routes';

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
      const proxyState = state;
      const { channelId } = action.payload;
      proxyState.currentChannelId = channelId;
    },
    renameChannel: (state, action) => {
      const proxyState = state;
      const { id, name } = action.payload;
      proxyState.channels.find((channel) => channel.id === id).name = name;
    },
    removeChannel: (state, action) => {
      const proxyState = state;
      const { id: removedChannelId } = action.payload;
      proxyState.channels = state.channels
        .filter(({ id }) => id !== removedChannelId);
      proxyState.currentChannelId = +state.currentChannelId === +removedChannelId
        ? defaultChannelId
        : state.currentChannelId;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDataThunk.fulfilled, (state, action) => {
        const proxyState = state;
        const { channels, currentChannelId } = action.payload;
        proxyState.channels = channels;
        proxyState.currentChannelId = currentChannelId;
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
