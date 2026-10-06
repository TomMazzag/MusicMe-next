'use client';

import { useAuth, useClerk } from '@clerk/nextjs';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { FollowEntityButton } from '../Buttons';

export const FollowButton = ({ isFollowing, userId }: { isFollowing: boolean; userId: string }) => {
  const [following, setFollowing] = useState(isFollowing);
  const { isSignedIn } = useAuth();
  const { openSignIn } = useClerk();

  const followUserMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch(`/api/user/follow`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ followUserId: userId }),
      });

      if (!res.ok) {
        throw new Error('Failed to follow user');
      }
    },
    onSuccess: () => {
      setFollowing((prev) => !prev);
    },
  });

  const handleFollow = () => {
    if (!isSignedIn) {
      openSignIn({ forceRedirectUrl: '/post-auth' });
      return;
    }

    followUserMutation.mutate();
  };

  return (
    <FollowEntityButton
      isFollowing={following}
      onClick={handleFollow}
      disabled={followUserMutation.isPending}
      className="w-[80%] self-center"
    />
  );
};
