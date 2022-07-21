import axios from "axios";
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import routes from "../routes/routes";

export const fetchData = createAsyncThunk(
    'data/fetchData',
    async (access_token) => {

        const response = await axios.get(routes.dataPath(), {
            headers: {
                'Authorization': `Basic ${access_token}`
            }
        });
        return response.data;
    },
);

const dataSlice = createSlice({
    name: 'data',
    initialState: [],
    extraReducers: (builder) => {
        builder
        .addCase(fetchData.fulfilled, (state, action) => {
            state.data = action.payload;
        })
        .addCase(fetchData.rejected, (state, action) => {
            console.log('extraReducers builder');
            console.log('state', state);
            console.log('action', action);
        })
    }
});

export default dataSlice.reducer;
