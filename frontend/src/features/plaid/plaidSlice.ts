import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";

interface PlaidState {
    plaidItemsIds: Array<Object>;
}

const initialState: PlaidState = {
    plaidItemsIds: [],
};

export const plaidSlice = createSlice({
    name: "plaid",
    initialState,
    reducers: {
        setPlaidItems: (state, action: PayloadAction<Array<Object>>) => {
            state.plaidItemsIds = action.payload;
        },
        addPlaidItem: (state, action: PayloadAction<Object>) => {
            state.plaidItemsIds.push(action.payload);
        },
        removePlaidItem: (state, action: PayloadAction<Object>) => {
            state.plaidItemsIds.filter((item) => item.id !== action.payload.id);
        },
        clearPlaidItems: (state) => {
            state.plaidItemsIds = [];
        },
    },
});

export const { setPlaidItems, addPlaidItem, removePlaidItem, clearPlaidItems } =
    plaidSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectPlaidItemIds = (state: RootState) => state.plaid.plaidItemsIds;

export default plaidSlice.reducer;
