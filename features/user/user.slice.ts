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
    deleteUserData: (): UserState => ({ ...initialState }),
    setToken: (state, action: PayloadAction<string>): UserState => ({
      ...state,
      token: action.payload,
    }),
    setUserData: (state, action: PayloadAction<UserState>): UserState => ({
      ...state,
      ...action.payload,
    }),
  },
});

export const {
  deleteUserData,
  setToken,
  setUserData,
} = userSlice.actions;

export default userSlice.reducer;
