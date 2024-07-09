import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/authentication/model/userSlice";

export const setupStore = configureStore({
    reducer: {
        user: userReducer,
    }
});