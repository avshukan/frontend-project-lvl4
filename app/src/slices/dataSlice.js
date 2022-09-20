import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import routes from '../routes/routes';

export const fetchData = createAsyncThunk(
  'data/fetchData',
  async (accessToken) => axios
    .get(routes.dataPath(), { headers: { Authorization: `Bearer ${accessToken}` } })
    .then(({ data }) => data),
);

const defaultChannelId = 1;

const initialState = {
  channels: [],
  messages: [],
  currentChannelId: defaultChannelId,
};

const dataSlice = createSlice({
  name: 'data',
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
      proxyState.messages = state.messages
        .filter(({ channelId }) => +channelId !== +removedChannelId);
      proxyState.currentChannelId = +state.currentChannelId === +removedChannelId
        ? defaultChannelId
        : state.currentChannelId;
    },
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.fulfilled, (state, action) => {
        const proxyState = state;
        const { channels, messages, currentChannelId } = action.payload;
        proxyState.channels = channels;
        proxyState.messages = messages;
        proxyState.currentChannelId = currentChannelId;
      })
      .addCase(fetchData.rejected, (state, action) => {
        toast.error('ALARM!!!', { autoClose: 10000 });
        console.error('extraReducers builder rejected', state, action);
      });
  },
});

export const {
  addChannel,
  switchChannel,
  renameChannel,
  removeChannel,
  addMessage,
} = dataSlice.actions;

export default dataSlice.reducer;
