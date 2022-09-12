import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import routes from '../routes/routes';

export const fetchData = createAsyncThunk(
  'data/fetchData',
  async (accessToken) => axios
    .get(routes.dataPath(), { headers: { Authorization: `Bearer ${accessToken}` } })
    .then(({ data }) => data),
);

const initialState = {
  channels: [],
  messages: [],
  currentChannelId: null,
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
        console.error('extraReducers builder rejected', state, action);
      });
  },
});

export const {
  addChannel,
  switchChannel,
  addMessage,
} = dataSlice.actions;

export default dataSlice.reducer;
