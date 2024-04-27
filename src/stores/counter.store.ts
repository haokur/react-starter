import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const CounterStore = createSlice({
    name: 'count',
    initialState: {
        currnetValue: 0,
    } as ICounter,
    reducers: {
        plusOrReduce(state, action: PayloadAction<number>) {
            state.currnetValue += action.payload
        }
    }
});

export const { plusOrReduce } = CounterStore.actions;
export default CounterStore;