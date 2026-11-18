'use client';

import type { FieldErrors, FieldValues } from 'react-hook-form';

type Props<TFieldValues extends FieldValues> = {
  errors: FieldErrors<TFieldValues>;
  className?: string;
};

/** Displays `setError('root', …)` or other non-field failures after submit. */
export default function FormRootError<TFieldValues extends FieldValues>({
  errors,
  className = 'text-error text-sm text-center',
}: Props<TFieldValues>) {
  const message = errors.root?.message;
  if (!message || typeof message !== 'string') return null;

  return <p className={className}>{message}</p>;
}