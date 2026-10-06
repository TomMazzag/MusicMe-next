'use client';

import { useAuth, useClerk } from '@clerk/nextjs';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { FollowEntityButton } from '../Buttons';

export const FollowArtistButton = ({ isFollowing, artistId }: { isFollowing: boolean; artistId: string }) => {
  const [following, setFollowing] = useState(isFollowing);
  const { isSignedIn } = useAuth();
  const { openSignIn } = useClerk();

  const followArtistMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch('/api/artist/follow', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ artistId }),
      });

      if (!res.ok) {
        throw new Error('Failed to follow artist');
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

    followArtistMutation.mutate();
  };

  return <FollowEntityButton isFollowing={following} onClick={handleFollow} className="md:w-auto min-w-30" />;
};
