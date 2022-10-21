/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import fetchDataThunk from './fetchDataThunk';

const initialState = {
  messages: [],
};

const dataSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    removeMessagesByChannelId: (state, action) => {
      const { id: removedChannelId } = action.payload;
      state.messages = state.messages
        .filter(({ channelId }) => channelId !== removedChannelId);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDataThunk.fulfilled, (state, action) => {
        const { messages } = action.payload;
        state.messages = messages;
      });
  },
});

export const {
  addMessage,
  removeMessagesByChannelId,
} = dataSlice.actions;

export default dataSlice.reducer;
