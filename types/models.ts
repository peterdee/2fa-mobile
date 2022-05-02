import { PIN_REQUIRED } from '../constants';

export type PINRequired = typeof PIN_REQUIRED[keyof typeof PIN_REQUIRED];

export interface TokenEntry {
  name: string;
  token: string;
}
