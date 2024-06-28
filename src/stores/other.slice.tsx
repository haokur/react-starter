import { createSlice } from "@reduxjs/toolkit"

interface IOtherSliceState {
    /**统计数量 */
    count: number,
}
const initialState: IOtherSliceState = {
    count: 1
}
export const otherSlice = createSlice({
    name: "other",
    initialState,
    reducers: {
        increment(state) {
            state.count += 1
        },
        decrement(state) {
            state.count -= 1
        }
    }
})