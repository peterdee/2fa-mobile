import totp from 'totp-generator';

import { AUTH_TYPES } from '../constants';
import { KeyURIData, SecretEntry } from '../types/models';

type TOTPOptions = Pick<KeyURIData, 'algorithm' | 'digits' | 'period'>;

export function generateToken(entry: KeyURIData | SecretEntry): null | number {
  if (!(entry && entry.secret)) {
    return null;
  }

  const options: TOTPOptions = {};
  if (entry.algorithm) options.algorithm = entry.algorithm;
  if (entry.digits) options.digits = entry.digits;
  if (entry.period)options.period = entry.period;

  return totp(entry.secret, options);
}

// TODO: this should be calculated for each token separately
export function getTimeLeft(): number {
  const seconds = new Date().getSeconds();
  return seconds > 30 ? 60 - seconds : 30 - seconds;
}

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
    if (algorithm) {
      // fix for the totp-generator
      const uppercased = algorithm.toUpperCase();
      if (algorithm.includes('-')) {
        data.algorithm = uppercased;
      } else {
        const [, version] = uppercased.split('SHA');
        data.algorithm = `SHA-${version}`;
      }
    }

    const digits = url.searchParams.get('digits');
    if (digits) data.digits = Number(digits);

    const period = url.searchParams.get('period');
    if (period) data.period = Number(period);

    return data;
  } catch {
    return null;
  }
}
