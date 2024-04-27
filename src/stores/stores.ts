import { configureStore } from '@reduxjs/toolkit';
import UserStore from './user.store';
import CounterStore from './counter.store';

const store = configureStore({
    reducer: {
        user: UserStore.reducer,
        counter: CounterStore.reducer,
    }
});

export default store;