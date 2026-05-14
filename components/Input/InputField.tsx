'use client';

import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface InputFieldProps {
  label: string;
  icon?: IconProp;
  placeholder?: string;
  currentState: string;
  setState: (value: string) => void;
  type?: string;
  disabled?: boolean;
}

export default function InputField({
  label,
  icon,
  placeholder = '',
  currentState,
  setState,
  type = 'text',
  disabled = false,
}: InputFieldProps) {
  return (
    <div className="form-control w-full">
      <label className="label">
        {icon && <FontAwesomeIcon icon={icon} className="mr-2" />}
        <span className="label-text">{label}</span>
      </label>
      <div className="input-group">
        <input
          type={type}
          placeholder={placeholder}
          value={currentState}
          onChange={(e) => setState(e.target.value)}
          disabled={disabled}
          className="input input-bordered w-full border-accent"
        />
      </div>
    </div>
  );
}
