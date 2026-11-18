import type { FieldError, FieldErrors, FieldValues } from 'react-hook-form';

export function getFormErrorMessage<TFieldValues extends FieldValues>(
  errors: FieldErrors<TFieldValues>,
  name: string,
): string | undefined {
  const segments = name.split('.');
  let current: unknown = errors;

  for (const segment of segments) {
    if (current === null || typeof current !== 'object') return undefined;
    current = (current as Record<string, unknown>)[segment];
  }

  if (current && typeof current === 'object' && 'message' in current) {
    const message = (current as FieldError).message;
    return typeof message === 'string' ? message : undefined;
  }

  return undefined;
}