import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';

import configurationSlice from '../features/configuration/configuration.slice';
import secretsSlice from '../features/secrets/secrets.slice';
import userSlice from '../features/user/user.slice';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  version: 1,
};

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
    configuration: configurationSlice,
    secrets: secretsSlice,
    user: userSlice,
  }),
);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [
        FLUSH,
        PAUSE,
        PERSIST,
        PURGE,
        REGISTER,
        REHYDRATE,
      ],
    },
  }),
});

export const persistedStore = persistStore(store);

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;
