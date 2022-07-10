import { configureStore } from '@reduxjs/toolkit';

import secretsSlice from '../features/secrets/secrets.slice';
import userSlice from '../features/user/user.slice';

export const store = configureStore({
  reducer: {
    secrets: secretsSlice,
    user: userSlice,
  },
});

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;
