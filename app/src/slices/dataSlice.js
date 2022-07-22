import axios from "axios";
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import routes from "../routes/routes";

export const fetchData = createAsyncThunk(
    'data/fetchData',
    async (access_token) => {
        const { data } = await axios.get(routes.dataPath(), {
            headers: {
                'Authorization': `Bearer ${access_token}`
            }
        });
        return data;
    },
);

const initialState = {
    data: {
        channels: [], 
        currentChannelId: null,
        messages: [],
    }
};

const dataSlice = createSlice({
    name: 'data',
    initialState: initialState,
    extraReducers: (builder) => {
        builder
            .addCase(fetchData.fulfilled, (state, action) => {
                state.data = { ...action.payload };
            })
            .addCase(fetchData.rejected, (state, action) => {
                console.log('extraReducers builder');
                console.log('state', state);
                console.log('action', action);
            })
    }
});

export default dataSlice.reducer;
