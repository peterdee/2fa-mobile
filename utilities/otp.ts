import totp from 'totp-generator';

import { AUTH_TYPES } from '../constants';
import { KeyURIData, SecretEntry } from '../types/models';

type TOTPOptions = Pick<KeyURIData, 'algorithm' | 'digits' | 'period'>;

export async function generateToken(
  entry: KeyURIData | SecretEntry,
): Promise<null | number> {
  if (!(entry && entry.secret)) {
    return null;
  }

  const options: TOTPOptions = {};
  if (entry.algorithm) options.algorithm = entry.algorithm;
  if (entry.digits) options.digits = entry.digits;
  if (entry.period)options.period = entry.period;

  const token = totp(entry.secret, options);

  // prevent the issue with invalid token using recursive token generating
  if (entry.digits && (`${token}`.length !== Number(entry.digits))) {
    await new Promise((resolve: (value: unknown) => void): void => {
      setTimeout(resolve, 500);
    });
    return generateToken(entry);
  }

  return token;
}

export function getTimeLeft(period = 30): number {
  const seconds = new Date().getSeconds();
  const float = seconds / period;
  const integer = Math.floor(float);
  return (period - Math.round(period * (float - integer)));
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
