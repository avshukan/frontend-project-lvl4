import { configureStore } from '@reduxjs/toolkit';
import dataReducer from './dataSlice';
import modalsReducer from './modalsSlice';

const store = configureStore({
  reducer: {
    data: dataReducer,
    modals: modalsReducer,
  },
});

export default store;
