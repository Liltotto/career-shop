import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/authentication/model/userSlice";

// import { RootState } from "@reduxjs/toolkit/query";

// const rootReducer = combineReducers({
//     user: userReducer
// });

// const setupStore = () => {
//     return configureStore({
//         reducer: rootReducer
//     })
// }

// export default setupStore
   
// export type RootState = ReturnType<typeof rootReducer>;
// export type AppStore = ReturnType<typeof setupStore>;
// export type AppDispatch = AppStore['dispatch'];

// export type RootState = ReturnType<typeof setupStore.getState>
// // Выведенные типы: {posts: PostsState, comments: CommentsState, users: UsersState}
// export type AppDispatch = typeof setupStore.dispatch


export const setupStore = configureStore({
    reducer: {
        user: userReducer,
    }
});