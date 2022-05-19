import totp from 'totp-generator';
import { URL } from 'react-native-url-polyfill';

import { AUTH_TYPES } from '../constants';
import { KeyURIData, SecretEntry } from '../types/models';

export function parseKeyURI(keyURI: string): null | KeyURIData {
  try {
    const url = new URL(keyURI);
    if (!(url.protocol && url.protocol.includes('otpauth') && url.host)) {
      return null;
    }
    const secret = url.searchParams.get('secret');
    if (!secret) {
      return null;
    }

    const data: KeyURIData = {
      authType: url.host as keyof typeof AUTH_TYPES,
      secret,
    };

    const [issuer, accountName] = url.pathname.split('/')[1].split(':');
    if (issuer) data.issuer = issuer;
    if (accountName) data.accountName = accountName;

    const algorithm = url.searchParams.get('algorithm');
    if (algorithm) data.algorithm = algorithm;

    const digits = url.searchParams.get('digits');
    if (digits) data.digits = Number(digits);

    const period = url.searchParams.get('period');
    if (period) data.period = Number(period);

    return data;
  } catch {
    return null;
  }
}

export function generateToken(entry: KeyURIData | SecretEntry): null | number {
  if (!(entry && entry.secret)) {
    return null;
  }

  return totp(entry.secret, { ...entry });
}
