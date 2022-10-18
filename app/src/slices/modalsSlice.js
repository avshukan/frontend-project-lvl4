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
      const proxyState = state;
      proxyState.type = null;
      proxyState.info = null;
    },
    showModal: (state, action) => {
      const proxyState = state;
      const { type, info } = action.payload;
      proxyState.type = type;
      proxyState.info = info;
    },
  },
});

export const {
  hideModal,
  showModal,
} = dataSlice.actions;

export default dataSlice.reducer;
