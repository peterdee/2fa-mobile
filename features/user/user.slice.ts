import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  login: string;
  token: string;
  userId: number | null;
}

const initialState: UserState = {
  login: '',
  token: '',
  userId: null,
};

export const userSlice = createSlice({
  initialState,
  name: 'user',
  reducers: {
    setData: (state, action: PayloadAction<UserState>) => {
      state.login = action.payload.login;
    },
    // decrement: (state) => {
    //   state.value -= 1
    // },
    // // Use the PayloadAction type to declare the contents of `action.payload`
    // incrementByAmount: (state, action: PayloadAction<number>) => {
    //   state.value += action.payload
    // },
  },
});

export const { setData } = userSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value;

export default userSlice.reducer;
