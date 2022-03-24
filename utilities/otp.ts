import totp from 'totp-generator';

export default function generateOTP(token: string): number | null {
  if (!token) {
    return null;
  }

  return totp(token);
}
