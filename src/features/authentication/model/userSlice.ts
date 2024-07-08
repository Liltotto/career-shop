import {PayloadAction, createSlice} from '@reduxjs/toolkit';

export interface UserState {
    email: string;
    token: string;
    id: string;
    password?: string;
}

const initialState : UserState = {
    email: '',
    token: '',
    id: '',
    password: '',
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<UserState>) {
            state.email = action.payload.email;
            state.token = action.payload.token;
            state.id = action.payload.id;
        },
        removeUser(state) {
            state.email = '';
            state.token = '';
            state.id = '';
        },
        setPassword(state, action: PayloadAction<string>) {
            state.password = action.payload;
        },

    },
});

export const {setUser, removeUser, setPassword} = userSlice.actions;

export default userSlice.reducer;