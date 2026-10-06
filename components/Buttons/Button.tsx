import { cn } from '@MusicMe/lib/styling';
import { CSSProperties } from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'accent';
  disabled?: boolean;
  className?: string;
  hexColour?: string;
}

const BASE_STYLING = (variant: 'primary' | 'accent') =>
  cn(
    'border-2 border-accent rounded-md px-4 py-2 hover:bg-accent hover:text-base-100 transition-colors duration-300 hover:cursor-pointer',
    {
      'border-accent hover:bg-accent hover:text-base-100': variant === 'accent',
      'border-primary hover:bg-primary hover:text-primary-content': variant === 'primary',
    },
  );

export function Button({ children, onClick, disabled, className, hexColour, variant = 'accent' }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(BASE_STYLING(variant), className)}
      style={{ '--hex-colour': hexColour } as CSSProperties}
    >
      {children}
    </button>
  );
}
