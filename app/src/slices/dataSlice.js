import axios from "axios";
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import routes from '../routes/routes';

export const fetchData = createAsyncThunk(
    'data/fetchData',
    async (access_token) => await axios
        .get(routes.dataPath(), { headers: { 'Authorization': `Bearer ${access_token}` } })
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
            console.log('action.payload', action.payload)
            state.currentChannelId = action.payload.channelId;
        },
        addMessage: (state, action) => {
            console.log('action.payload', action.payload)
            state.messages.push(action.payload)
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchData.fulfilled, (state, action) => {
                state.channels = action.payload.channels;
                state.messages = action.payload.messages;
                state.currentChannelId = action.payload.currentChannelId;
            })
            .addCase(fetchData.rejected, (state, action) => {
                console.error('extraReducers builder rejected', state, action);
            })
    }
});

export const {
    switchChannel,
    addMessage,
} = dataSlice.actions;

export default dataSlice.reducer;
