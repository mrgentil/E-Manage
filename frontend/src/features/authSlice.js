import { createSlice } from '@reduxjs/toolkit';
import { updatePassword } from '../redux/api/authActions';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        token: null,
        isAuthenticated: false,
        error: null,
    },
    reducers: {
        loginSuccess: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.isAuthenticated = true;
            state.error = null;
        },
        setCredentials: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.isAuthenticated = true;
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(updatePassword.fulfilled, (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.isAuthenticated = true;
            state.error = null;
        });
        builder.addCase(updatePassword.rejected, (state, action) => {
            state.error = action.payload;
        });
    },
});

export const { loginSuccess, setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;
