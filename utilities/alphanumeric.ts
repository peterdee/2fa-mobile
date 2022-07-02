const REGEXP = /^[a-zA-Z0-9]+$/;

export default function isAlphanumeric(value: string): boolean {
  return REGEXP.test(value);
}
