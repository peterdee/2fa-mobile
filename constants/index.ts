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
  currentPasswordIsInvalid: 'Current password is invalid!',
  generic: 'Oops! Something went wrong!',
  invalidData: 'Provided data is invalid!',
  loginIsAlreadyInUse: 'Login is already in use!',
  loginIsTooLong: 'Login is too long!',
  loginShouldBeAlphanumeric: 'Login should be alphanumeric!',
  missingData: 'Missing required data!',
  passwordContainsSpaces: 'Password contains spaces!',
  passwordIsTooShort: 'Password is too short!',
  pleaseProvideTheData: 'Please provide the data!',
};

export const KEYBOARD = {
  backspace: 'backspace',
  empty: 'empty',
};

export const LOGIN_MAX_LENGTH = 16;

export const PASSWORD_MIN_LENGTH = 8;

export const PIN_REQUIRED = {
  isRequired: 'isRequired',
  isNotRequired: 'isNotRequired',
};

export const PROFILE_MODAL_ACTIONS = {
  signIn: 'signIn',
  signUp: 'signUp',
  skip: 'skip',
};

export const PROFILE_MODAL_STATE = {
  notShown: 'notShown',
  shown: 'shown',
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
