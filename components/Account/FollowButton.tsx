'use client';

import { useAuth, useClerk } from '@clerk/nextjs';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';

export const FollowButton = ({ isFollowing, userId }: { isFollowing: boolean, userId: string }) => {
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
    <button
      className={`btn btn-sm w-[80%] self-center border-accent ${!following && 'btn-accent'}`}
      onClick={handleFollow}
      disabled={followUserMutation.isPending}
    >
      {following ? 'Following' : 'Follow'}
    </button>
  );
};
