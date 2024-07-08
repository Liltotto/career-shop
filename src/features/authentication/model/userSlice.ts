import {PayloadAction, createSlice} from '@reduxjs/toolkit';

export interface UserState {
    email: string;
    token: string;
    id: string;
    password?: string;
    isLoading?: boolean;
}

const initialState : UserState = {
    email: '',
    token: '',
    id: '',
    password: '',
    isLoading: false
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<Omit<UserState, 'loading'>>) {
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
        setIsLoading(state, action: PayloadAction<boolean>) {
            state.isLoading = action.payload
        }

    },
});

export const {setUser, removeUser, setPassword, setIsLoading} = userSlice.actions;

export default userSlice.reducer;