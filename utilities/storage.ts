import * as SecureStore from 'expo-secure-store';

export const KEYS = {
  pin: 'pin',
  tokens: 'tokens',
} as const;

export async function storeValue<T>(
  key: keyof typeof KEYS,
  value: T,
): Promise<void> {
  return SecureStore.setItemAsync(key, value);
}
