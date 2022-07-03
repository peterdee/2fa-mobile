import * as SecureStore from 'expo-secure-store';

interface StoreItem<T> {
  value: T;
}

export const KEYS = {
  login: 'login',
  pin: 'pin',
  pinRequired: 'pinRequired',
  profileModalShown: 'profileModalShown',
  secrets: 'secrets',
  token: 'token',
  userId: 'userId',
} as const;

export async function deleteValue(key: keyof typeof KEYS): Promise<void> {
  return SecureStore.deleteItemAsync(key);
}

export async function getValue<T>(key: keyof typeof KEYS): Promise<null | T> {
  const string = await SecureStore.getItemAsync(key);
  if (!string) {
    return null;
  }

  try {
    const item: StoreItem<T> = JSON.parse(string);
    return item.value;
  } catch {
    return null;
  }
}

export async function storeValue<T>(
  key: keyof typeof KEYS,
  value: T,
): Promise<void> {
  return SecureStore.setItemAsync(
    key,
    JSON.stringify({ value } as StoreItem<T>),
  );
}
