import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { PIN_REQUIRED } from '../../constants';

interface ConfigurationState {
  pin: string,
  pinRequired: keyof typeof PIN_REQUIRED,
  profileModalShown: boolean,
}

const initialState: ConfigurationState = {
  pin: '',
  pinRequired: PIN_REQUIRED.isNotRequired as keyof typeof PIN_REQUIRED,
  profileModalShown: false,
};

export const configurationSlice = createSlice({
  initialState,
  name: 'configuration',
  reducers: {
    resetConfiguration: (): ConfigurationState => ({ ...initialState }),
    setPIN: (
      state,
      action: PayloadAction<string>,
    ): ConfigurationState => ({
      ...state,
      pin: action.payload,
    }),
    setPINRequired: (
      state,
      action: PayloadAction<keyof typeof PIN_REQUIRED>,
    ): ConfigurationState => ({
      ...state,
      pinRequired: action.payload,
    }),
    setProfileModalShown: (
      state,
      action: PayloadAction<boolean>,
    ): ConfigurationState => ({
      ...state,
      profileModalShown: action.payload,
    }),
  },
});

export const {
  resetConfiguration,
  setPIN,
  setPINRequired,
  setProfileModalShown,
} = configurationSlice.actions;

export default configurationSlice.reducer;
