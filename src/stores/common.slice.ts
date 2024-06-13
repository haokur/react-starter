import { createSlice } from "@reduxjs/toolkit"

export const commonSlice = createSlice({
    name: "common1",
    initialState: {
        count: 1,
    },
    reducers: {
        increment(state) {
            state.count += 1
        },
        decrement(state) {
            state.count -= 1
        }
    }
})