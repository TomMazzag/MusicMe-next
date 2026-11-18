'use client';

import type { FieldErrors, FieldValues } from 'react-hook-form';
import { getFormErrorMessage } from '@MusicMe/lib/forms/errors';

type Props<TFieldValues extends FieldValues> = {
  errors: FieldErrors<TFieldValues>;
  name: string;
  className?: string;
};

export default function FormFieldError<TFieldValues extends FieldValues>({
  errors,
  name,
  className = 'text-error text-sm mt-1',
}: Props<TFieldValues>) {
  const message = getFormErrorMessage(errors, name);
  if (!message) return null;

  return <p className={className}>{message}</p>;
}