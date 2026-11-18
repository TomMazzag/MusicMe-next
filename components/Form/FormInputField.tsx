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
  placeholder?: string;
  type?: string;
  disabled?: boolean;
  className?: string;
};

export default function FormInputField<TFieldValues extends FieldValues>({
  name,
  label,
  register,
  errors,
  icon,
  placeholder = '',
  type = 'text',
  disabled = false,
  className,
}: Props<TFieldValues>) {
  const errorMessage = getFormErrorMessage(errors, name);

  return (
    <div className={cn('form-control w-full', className)}>
      <label className="label" htmlFor={name}>
        {icon && <FontAwesomeIcon icon={icon} className="mr-2" />}
        <span className="label-text">{label}</span>
      </label>
      <div className="input-group">
        <input
          id={name}
          type={type}
          placeholder={placeholder}
          disabled={disabled}
          aria-invalid={errorMessage ? true : undefined}
          className={cn('input input-bordered w-full border-accent', errorMessage && 'input-error')}
          {...register(name)}
        />
      </div>
      <FormFieldError errors={errors} name={name} />
    </div>
  );
}