
import { configureStore } from '@reduxjs/toolkit'
import { TestSlice } from './test.slice'
import { commonSlice } from './common.slice'
import { UserSlice } from './user.slice'

const stores = configureStore({
    reducer: {
        common: commonSlice.reducer,
        test: TestSlice.reducer,
        user: UserSlice.reducer,
    },
})

export default stores