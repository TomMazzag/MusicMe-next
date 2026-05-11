'use client';

import { useState } from 'react';

import { Profile } from '../../types/Profile';
import { followOrUnfollowUser } from '@MusicMe/lib/userConnection';

export const UserProfileTile = ({
  user_id,
  full_name,
  profile_picture_url,
  username,
  is_following,
  currentUserId,
}: Profile.Conneciton) => {
  const [following, setFollowing] = useState(is_following);

  const followUser = async () => {
    followOrUnfollowUser(user_id);
    setFollowing(!following);
  };

  return (
    <div className="flex justify-between py-2 px-2">
      <a className="flex gap-4 cursor-pointer grow" href={currentUserId !== user_id ? `/user/${user_id}` : '/account'}>
        <img src={profile_picture_url} alt="" className="w-20 h-20 object-cover rounded-[50%]" />
        <div className="flex flex-col justify-center">
          <h3>{full_name}</h3>
          <p className="opacity-55">{username}</p>
        </div>
      </a>
      {currentUserId !== user_id && (
        <button
          className={`btn btn-sm self-center px-6 border-primary hover:bg-primary hover:text-primary-content rounded-md w-22 ${!is_following && 'btn-primary'}`}
          onClick={followUser}
        >
          {following ? 'Following' : 'Follow'}
        </button>
      )}
    </div>
  );
};
