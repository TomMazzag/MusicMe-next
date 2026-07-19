'use client';

import { useState } from "react";

export const FollowButton = ({ isFollowing }: { isFollowing: boolean }) => {
    const [following, setFollowing] = useState(isFollowing);

    const handleFollow = () => {
        setFollowing(!following);
    }

  return (
    <button
      className={`btn btn-sm w-[80%] self-center border-accent ${!following && 'btn-accent'}`}
      onClick={handleFollow}
    >
      {following ? 'Following' : 'Follow'}
    </button>
  );
};