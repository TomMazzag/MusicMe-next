'use client';

import { useState } from 'react';

import { Profile } from '../../types/Profile';

export const UserProfileTile = ({
  userId,
  fullName,
  profilePictureUrl,
  username,
  isFollowing,
  currentUserId,
}: Profile.Conneciton) => {
  const [following, setFollowing] = useState(isFollowing);

  const followUser = async () => {
    fetch(`/api/user/follow`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ follow_id: userId }),
    });
    setFollowing(!following);
  };

  return (
    <div className="flex justify-between py-2 px-2">
      <a className="flex gap-4 cursor-pointer grow" href={currentUserId !== userId ? `/user/${userId}` : '/account'}>
        <img src={profilePictureUrl} alt="" className="w-20 h-20 object-cover rounded-[50%]" />
        <div className="flex flex-col justify-center">
          <h3>{fullName}</h3>
          <p className="opacity-55">{username}</p>
        </div>
      </a>
      {currentUserId !== userId && (
        <button
          className={`btn btn-sm self-center px-6 border-primary hover:bg-primary hover:text-primary-content rounded-md w-22 ${!isFollowing && 'btn-primary'}`}
          onClick={followUser}
        >
          {following ? 'Following' : 'Follow'}
        </button>
      )}
    </div>
  );
};
