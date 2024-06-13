import { createSlice } from "@reduxjs/toolkit"

export const UserSlice = createSlice({
    name: "user",
    initialState: {
        userInfo: null
    },
    reducers: {
        setUserInfo(state, action) {
            state.userInfo = action.payload
        },
        removeUserInfo(state) {
            state.userInfo = null
        }
    }
})