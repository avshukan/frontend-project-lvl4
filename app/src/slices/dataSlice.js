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
    switchChannel: (state, action) => {
      console.log('action.payload', action.payload);
      // state.currentChannelId = action.payload.channelId;
      const { channelId } = action.payload;
      return {
        ...state,
        currentChannelId: channelId,
      };
    },
    addMessage: (state, action) => {
      console.log('action.payload', action.payload);
      state.messages.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.fulfilled, (state, action) => {
        // state.channels = action.payload.channels;
        // state.messages = action.payload.messages;
        // state.currentChannelId = action.payload.currentChannelId;
        const { channels, messages, currentChannelId } = action.payload;
        return {
          ...state,
          channels,
          messages,
          currentChannelId,
        };
      })
      .addCase(fetchData.rejected, (state, action) => {
        console.error('extraReducers builder rejected', state, action);
      });
  },
});

export const {
  switchChannel,
  addMessage,
} = dataSlice.actions;

export default dataSlice.reducer;
