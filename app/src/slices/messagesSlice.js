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
      const proxyState = state;
      const { id: removedChannelId } = action.payload;
      proxyState.messages = state.messages
        .filter(({ channelId }) => +channelId !== +removedChannelId);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDataThunk.fulfilled, (state, action) => {
        const proxyState = state;
        const { messages } = action.payload;
        proxyState.messages = messages;
      });
  },
});

export const {
  addMessage,
  removeMessagesByChannelId,
} = dataSlice.actions;

export default dataSlice.reducer;
