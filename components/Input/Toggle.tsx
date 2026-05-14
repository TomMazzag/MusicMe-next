'use client';

type ToggleProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
};

export default function Toggle({ checked, onChange, disabled = false }: ToggleProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className={`
        relative flex h-6 w-12 items-center rounded-full
        transition-colors duration-300
        ${checked ? 'bg-accent' : 'bg-base-300'}
        ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}
      `}
    >
      <span
        className={`
          absolute left-1 h-4 rounded-full
          bg-white/15
          transition-all duration-300
          ${checked ? 'w-8' : 'w-4'}
        `}
      />
      <span
        className={`
          absolute left-1 h-4 w-4 rounded-full
          bg-white shadow-md
          transition-transform duration-300
          ${checked ? 'translate-x-6' : 'translate-x-0'}
        `}
      />
    </button>
  );
}
