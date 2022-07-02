import BACKEND_URL_STRING from './backend-url';

export const AUTH_TYPES = {
  hotp: 'hotp',
  totp: 'totp',
};

export const BACKEND_URL = BACKEND_URL_STRING;

export const CLIENT_TYPE = 'mobile';

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

export const ERROR_MESSAGES = {
  accessDenied: 'Access denied!',
  generic: 'Oops! Something went wrong!',
  invalidData: 'Provided data is invalid!',
  missingData: 'Missing required data!',
  passwordContainsSpaces: 'Password contains spaces!',
};

export const KEYBOARD = {
  backspace: 'backspace',
  empty: 'empty',
};

export const PIN_REQUIRED = {
  isRequired: 'isRequired',
  isNotRequired: 'isNotRequired',
};

export const PROFILE_MODAL_ACTIONS = {
  signIn: 'signIn',
  signUp: 'signUp',
  skip: 'skip',
};

export const RESPONSE_MESSAGES = {
  internalServerError: 'INTERNAL_SERVER_ERROR',
  invalidData: 'INVALID_DATA',
  invalidLogin: 'INVALID_LOGIN',
  invalidToken: 'INVALID_TOKEN',
  loginAlreadyInUse: 'LOGIN_ALREADY_IN_USE',
  loginIsTooLong: 'LOGIN_IS_TOO_LONG',
  missingData: 'MISSING_DATA',
  missingToken: 'MISSING_TOKEN',
  ok: 'OK',
  oldPasswordIsInvalid: 'OLD_PASSWORD_IS_INVALID',
  passwordContainsSpaces: 'PASSWORD_CONTAINS_SPACES',
  passwordIsTooShort: 'PASSWORD_IS_TOO_SHORT',
  unauthorized: 'UNAUTHORIZED',
};

export const SPACER = 16;

export const SPACER_HALF = SPACER / 2;
