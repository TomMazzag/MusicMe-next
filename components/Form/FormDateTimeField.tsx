'use client';

import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { cn } from '@MusicMe/lib/styling';
import { parseDatetimeLocal, toDatetimeLocalValue } from '@MusicMe/lib/forms/datetimeLocal';
import { getFormErrorMessage } from '@MusicMe/lib/forms/errors';
import type { Control, FieldErrors, FieldPath, FieldValues } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import FormFieldError from './FormFieldError';

type Props<TFieldValues extends FieldValues> = {
  name: FieldPath<TFieldValues>;
  label: string;
  control: Control<TFieldValues>;
  errors: FieldErrors<TFieldValues>;
  icon?: IconProp;
  disabled?: boolean;
  className?: string;
  /** When true, clearing the input sets the field value to `undefined`. */
  optional?: boolean;
};

function toInputValue(value: unknown): string {
  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    return toDatetimeLocalValue(value);
  }
  return '';
}

export default function FormDateTimeField<TFieldValues extends FieldValues>({
  name,
  label,
  control,
  errors,
  icon,
  disabled = false,
  className,
  optional = false,
}: Props<TFieldValues>) {
  const errorMessage = getFormErrorMessage(errors, name);

  return (
    <div className={cn('form-control w-full', className)}>
      <label className="label" htmlFor={name}>
        {icon && <FontAwesomeIcon icon={icon} className="mr-2" />}
        <span className="label-text">{label}</span>
      </label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <input
            id={name}
            type="datetime-local"
            disabled={disabled}
            aria-invalid={errorMessage ? true : undefined}
            className={cn('input input-bordered w-full border-accent', errorMessage && 'input-error')}
            value={toInputValue(field.value)}
            onChange={(e) => {
              const parsed = parseDatetimeLocal(e.target.value);
              if (optional) {
                field.onChange(parsed);
                return;
              }
              if (parsed) {
                field.onChange(parsed);
              }
            }}
            onBlur={field.onBlur}
            ref={field.ref}
          />
        )}
      />
      <FormFieldError errors={errors} name={name} />
    </div>
  );
}