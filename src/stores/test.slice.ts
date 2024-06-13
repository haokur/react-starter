import { createSlice } from "@reduxjs/toolkit";

export const TestSlice = createSlice({
    name: "test",
    initialState: { count: 0 },
    reducers: {
        add: (state, action) => {
            state.count += action.payload
        },
        minus: (state, action) => {
            state.count -= action.payload
        }
    }
})