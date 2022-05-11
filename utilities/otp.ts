import totp from 'totp-generator';

import { AUTH_TYPES } from '../constants';
import { KeyURIData } from '../types/models';

export function parseKeyURI(keyURI: string): null | KeyURIData {
  try {
    const url = new URL(keyURI);
    if (!(url.protocol && url.protocol.includes('otpauth'))) {
      return null;
    }

    const secret = url.searchParams.get('secret');
    if (!secret) {
      return null;
    }

    const [authType, details] = url.pathname
      .split('//')[1]
      .split('/') as [keyof typeof AUTH_TYPES, string];
    if (!authType) {
      return null;
    }

    const data: KeyURIData = {
      authType,
      secret,
    };

    const [issuer, accountName] = details.split(':');
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

export function generateToken(secret: string): null | number {
  if (!secret) {
    return null;
  }

  return totp(secret);
}
