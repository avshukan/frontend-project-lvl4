import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import routes from '../routes/routes';

export default createAsyncThunk(
  'data/fetchData',
  async (accessToken) => axios
    .get(routes.dataPath(), { headers: { Authorization: `Bearer ${accessToken}` } })
    .then(({ data }) => data),
);
