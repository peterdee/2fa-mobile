import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { SecretEntry } from '../../types/models';

interface SecretsState {
  secrets: SecretEntry[];
}

const initialState: SecretsState = {
  secrets: [],
};

export const secretsSlice = createSlice({
  initialState,
  name: 'secrets',
  reducers: {
    addSecret: (state, action: PayloadAction<SecretEntry>): SecretsState => ({
      secrets: [...state.secrets, action.payload],
    }),
    deleteAllSecrets: (): SecretsState => ({
      secrets: [],
    }),
    deleteSecret: (state, action: PayloadAction<string>): SecretsState => ({
      secrets: state.secrets.filter(
        (secret: SecretEntry): boolean => secret.id !== action.payload,
      ),
    }),
    deleteSynchronizationData: (state): SecretsState => ({
      secrets: state.secrets.map(
        (secret: SecretEntry): SecretEntry => ({
          ...secret,
          synchronizedAt: null,
          userId: null,
        }),
      ),
    }),
    deleteSynchronizedSecrets: (state): SecretsState => ({
      secrets: state.secrets.filter(
        (secret: SecretEntry): boolean => !secret.synchronizedAt,
      ),
    }),
    updateSecret: (state, action: PayloadAction<SecretEntry>): SecretsState => ({
      secrets: state.secrets.map(
        (secret: SecretEntry): SecretEntry => {
          if (secret.id === action.payload.id) {
            return { ...action.payload };
          }
          return secret;
        },
      ),
    }),
  },
});

export const {
  addSecret,
  deleteAllSecrets,
  deleteSecret,
  deleteSynchronizationData,
  deleteSynchronizedSecrets,
  updateSecret,
} = secretsSlice.actions;

export default secretsSlice.reducer;
