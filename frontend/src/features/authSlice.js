import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userInfo: null,
    token: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            state.userInfo = action.payload.user;
            state.token = action.payload.token;
            console.log('Set credentials:', state.userInfo, state.token);
        },
        logout: (state) => {
            state.userInfo = null;
            localStorage.clear();
            console.log('Logged out');
        },
    },
});


export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;
