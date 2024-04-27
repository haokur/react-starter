import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const UserStore = createSlice({
    name: 'user',
    initialState: {
        userInfo: {
            id: 0,
            name: "",
            age: 18
        } as IUser
    },
    reducers: {
        setUserInfo: (state, action: PayloadAction<IUser>) => {
            state.userInfo = action.payload
        }
    }
});

export const { setUserInfo } = UserStore.actions;
export default UserStore;