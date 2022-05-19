import { AUTH_TYPES, PIN_REQUIRED } from '../constants';

export interface KeyURIData {
  algorithm?: string;
  accountName?: string;
  authType: keyof typeof AUTH_TYPES;
  counter?: number;
  digits?: number;
  issuer?: string;
  period?: number;
  secret: string;
}

export type PINRequired = typeof PIN_REQUIRED[keyof typeof PIN_REQUIRED];

export interface SecretEntry extends KeyURIData {
  id: string;
}
