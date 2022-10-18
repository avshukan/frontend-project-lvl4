/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  type: null,
  info: null,
};

const dataSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    hideModal: (state) => {
      state.type = null;
      state.info = null;
    },
    showModal: (state, action) => {
      const { type, info } = action.payload;
      state.type = type;
      state.info = info;
    },
  },
});

export const {
  hideModal,
  showModal,
} = dataSlice.actions;

export default dataSlice.reducer;
