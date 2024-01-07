import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";

interface AuthState {
    userId: string;
    isLinkSuccess: boolean;
}

const initialState: AuthState = {
    userId: "",
    isLinkSuccess: false,
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUserId: (state, action: PayloadAction<string>) => {
            state.userId = action.payload;
        },
        clearUserId: (state) => {
            state.userId = "";
        },
        setLinkSuccessful: (state, action: PayloadAction<boolean>) => {
            state.isLinkSuccess = action.payload;
        },
    },
});

export const { setUserId, clearUserId, setLinkSuccessful } = authSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectUserId = (state: RootState) => state.auth.userId;
export const selectIsLinkSuccessful = (state: RootState) =>
    state.auth.isLinkSuccess;

export default authSlice.reducer;
