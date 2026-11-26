'use client';

import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { cn } from '@MusicMe/lib/styling';
import type { FieldErrors, FieldPath, FieldValues, UseFormRegister } from 'react-hook-form';
import { getFormErrorMessage } from '@MusicMe/lib/forms/errors';
import FormFieldError from './FormFieldError';

type Props<TFieldValues extends FieldValues> = {
  name: FieldPath<TFieldValues>;
  label: string;
  register: UseFormRegister<TFieldValues>;
  errors: FieldErrors<TFieldValues>;
  icon?: IconProp;
  type?: string;
  disabled?: boolean;
  className?: string;
  options: { label: string; value: string }[];
};

export default function FormSelectField<TFieldValues extends FieldValues>({
  name,
  label,
  register,
  errors,
  icon,
  disabled = false,
  className,
  options,
}: Props<TFieldValues>) {
  const errorMessage = getFormErrorMessage(errors, name);

  return (
    <div className={cn('form-control w-full', className)}>
      <label className="label" htmlFor={name}>
        {icon && <FontAwesomeIcon icon={icon} className="mr-2" />}
        <span className="label-text">{label}</span>
      </label>
      <div className="input-group">
        <select
          id={name}
          disabled={disabled}
          aria-invalid={errorMessage ? true : undefined}
          className={cn('select select-bordered w-full border-accent', errorMessage && 'select-error')}
          {...register(name)}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
      </div>
      <FormFieldError errors={errors} name={name} />
    </div>
  );
}
