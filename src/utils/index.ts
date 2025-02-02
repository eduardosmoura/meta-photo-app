export function classNames(...classes: unknown[]): string {
  return classes.filter(Boolean).join(' ');
}

export const DEFAULT_LIMIT = 25;

export const DEFAULT_OFFSET = 0;
