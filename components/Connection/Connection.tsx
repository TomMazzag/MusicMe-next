'use client';

import { useUser } from '@MusicMe/context/UserContext';
import { getFollowers, getFollowing } from '@MusicMe/lib/userConnection';
import { Profile } from '@MusicMe/types/Profile';
import { useEffect, useState } from 'react';
import { UserProfileTile } from '../User/UserProfileTile';
import { ScaleLoader } from 'react-spinners';

interface ConnectionProps {
  connectionType: 'followers' | 'following';
  userId: string;
}

interface User {
  full_name: string;
}

export default function Connection({ connectionType, userId }: ConnectionProps) {
  const [connections, setConnections] = useState([]);
  const [user, setUser] = useState<User>();
  const currentUserId = useUser().user?.user_id;
  const dataFunction = connectionType === 'following' ? getFollowing : getFollowers;

  useEffect(() => {
    if (!userId) {
      return console.log('User ID is unavailable, fetching connections...');
    }
    dataFunction(userId).then((data) => {
      console.log(data);
      setConnections(data.friends);
      setUser(data.user);
    });
  }, []);

  return (
    <div className="flex items-center p-5 md:p-10 flex-col">
      {user && connections ? (
        <>
          <p className="text text-l md:text-2xl">
            Showing {connectionType} for {user.full_name}
          </p>

          <div className="flex flex-col w-full gap-3 py-5 md:w-[50%]">
            {connections.length > 0 ? (
              connections.map((connection: Profile.Conneciton) => (
                <UserProfileTile
                  key={connection.user_id}
                  user_id={connection.user_id}
                  full_name={connection.full_name}
                  profile_picture_url={connection.profile_picture_url}
                  username={connection.username}
                  is_following={connection.is_following}
                  currentUserId={currentUserId!}
                />
              ))
            ) : (
              <p className="text text-center py-20">No {connectionType} found</p>
            )}
          </div>
        </>
      ) : (
        <ScaleLoader color={'#22c55e'} />
      )}
    </div>
  );
}
