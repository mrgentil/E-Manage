// authActions.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const updatePassword = createAsyncThunk('auth/updatePassword', async ({ token, newPassword }, thunkAPI) => {
    try {
        const response = await axios.post('http://localhost:5000/api/users/update-password', { token, newPassword });
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});
