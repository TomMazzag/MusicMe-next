import { cn } from '@MusicMe/lib/styling';
import { Button } from './Button';

interface ButtonProps {
  isFollowing: boolean;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  hexColour?: string;
}

export function FollowEntityButton({ isFollowing, onClick, disabled, className, hexColour }: ButtonProps) {
  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      className={cn('bg-accent text-sm py-1', { 'bg-base-300': !isFollowing, 'text-base-300': isFollowing }, className)}
      hexColour={hexColour}
    >
      {isFollowing ? 'Following' : 'Follow'}
    </Button>
  );
}
