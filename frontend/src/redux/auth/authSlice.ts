import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AuthState {
    username: string | null;
    accessToken: string | null;
}

const initialState: AuthState = {
    username: null,
    accessToken: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginState: (state, action: PayloadAction<{ username: string; accessToken: string }>) => {
            state.username = action.payload.username;
            state.accessToken = action.payload.accessToken;
            localStorage.setItem('username', action.payload.username);
            localStorage.setItem('access', action.payload.accessToken);
        },
        logoutState: (state) => {
            state.username = null;
            state.accessToken = null;
            localStorage.removeItem('username');
            localStorage.removeItem('access');
        },
        setUsernameFromLocalStorageState: (state) => {
            state.username = localStorage.getItem('username');
            state.accessToken = localStorage.getItem('access');
        },
    },
});

export const { loginState, logoutState, setUsernameFromLocalStorageState } = authSlice.actions;
export default authSlice.reducer;
