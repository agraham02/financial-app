import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/auth/authSlice";
import plaidSlice from "../features/plaid/plaidSlice";

export const store = configureStore({
    reducer: {
        auth: authSlice,
        plaid: plaidSlice,
    },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
