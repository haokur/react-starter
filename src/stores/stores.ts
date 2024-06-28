
import { configureStore } from '@reduxjs/toolkit'
import { TestSlice } from './test.slice'
import { commonSlice } from './common.slice'
import { UserSlice } from './user.slice'
import { otherSlice } from './other.slice'

const reducer = {
    /**通用 */
    common: commonSlice.reducer,
    /**测试 */
    test: TestSlice.reducer,
    /**用户状态 */
    user: UserSlice.reducer,
    /**其他状态 */
    other: otherSlice.reducer
}

type SliceReducers = typeof reducer;
type ExtractState<T> = {
    [K in keyof T]: T[K] extends (...args: any[]) => infer R ? R : never;
};
export type IStoreState = ExtractState<SliceReducers>;

export default configureStore({ reducer })