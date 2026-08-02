'use client';

import { faStar, faStarHalfStroke } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const STAR_COUNT = 5;

type StarType = 'full' | 'half' | 'empty';

function getStarType(starIndex: number, rating: number): StarType {
  const threshold = starIndex + 1;
  if (rating >= threshold) return 'full';
  if (rating >= threshold - 0.5) return 'half';
  return 'empty';
}

const sizeClasses = {
  sm: 'text-sm',
  md: 'text-lg',
  lg: 'text-xl',
};

type Props = {
  value?: number;
  onChange?: (rating: number) => void;
  readOnly?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
};

function EmptyStar({ size }: { size: 'sm' | 'md' | 'lg' }) {
  return <i className={`fa-regular fa-star ${sizeClasses[size]}`} />;
}

export default function StarRating({ value = 0, onChange, readOnly = false, size = 'md', className = '' }: Props) {
  const isInteractive = !readOnly && onChange != null;

  return (
    <div
      className={`inline-flex items-center gap-0.5 ${className}`}
      role={isInteractive ? 'slider' : 'img'}
      aria-label={isInteractive ? 'Rate this song' : `Rating: ${value} out of 5 stars`}
    >
      {Array.from({ length: STAR_COUNT }, (_, index) => {
        const starType = isInteractive
          ? index + 1 <= (value || 0)
            ? 'full'
            : 'empty'
          : value === 0
            ? 'empty'
            : getStarType(index, value);

        if (isInteractive) {
          const highlighted = starType === 'full';
          return (
            <button
              key={index}
              type="button"
              className={`p-0.5 transition-colors ${sizeClasses[size]} ${
                highlighted ? 'text-accent' : 'text-base-content/40 hover:text-accent/70'
              }`}
              onClick={() => onChange(index + 1)}
              aria-label={`${index + 1} star${index + 1 === 1 ? '' : 's'}`}
            >
              {highlighted ? <FontAwesomeIcon icon={faStar} /> : <EmptyStar size={size} />}
            </button>
          );
        }

        if (starType === 'empty') {
          return (
            <span key={index} className={`text-base-content/30 ${sizeClasses[size]}`}>
              <EmptyStar size={size} />
            </span>
          );
        }

        const icon = starType === 'half' ? faStarHalfStroke : faStar;
        return (
          <span key={index} className={`text-accent ${sizeClasses[size]}`}>
            <FontAwesomeIcon icon={icon} />
          </span>
        );
      })}
    </div>
  );
}
