import BACKEND_URL_STRING from './backend-url';

export const AUTH_TYPES = {
  hotp: 'hotp',
  totp: 'totp',
};

export const BACKEND_URL = BACKEND_URL_STRING;

export const COLORS = {
  accent: '#2244FF',
  background: '#FFFFFF',
  muted: '#A0A0A0',
  mutedDark: '#686868',
  mutedLight: '#EAEAEA',
  negative: '#BF1725',
  positive: '#259F37',
  text: '#080808',
  textInverted: '#FFFFFF',
};

export const KEYBOARD = {
  backspace: 'backspace',
  empty: 'empty',
};

export const PIN_REQUIRED = {
  isRequired: 'isRequired',
  isNotRequired: 'isNotRequired',
};

export const SPACER = 16;

export const SPACER_HALF = SPACER / 2;
