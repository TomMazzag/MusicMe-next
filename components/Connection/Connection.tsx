'use client';

import { Profile } from '@MusicMe/types/Profile';
import { useEffect, useState } from 'react';
import { UserProfileTile } from '../User/UserProfileTile';
import { ScaleLoader } from 'react-spinners';
import { useUserId } from '@MusicMe/hooks/useUserId';

interface ConnectionProps {
  connectionType: 'followers' | 'following';
  userId: string;
}

interface User {
  fullName: string;
}

export default function Connection({ connectionType, userId }: ConnectionProps) {
  const [connections, setConnections] = useState([]);
  const [user, setUser] = useState<User>();
  const currentUserId = useUserId();

  useEffect(() => {
    if (!userId) {
      return console.log('User ID is unavailable, fetching connections...');
    }
    fetch(`/api/user/connection?userId=${userId}&type=${connectionType}`)
      .then((res) => res.json())
      .then((data) => {
        setConnections(data.friends);
        setUser(data.user);
      });
  }, [connectionType, userId]);

  return (
    <div className="flex items-center p-5 md:p-10 flex-col">
      {user && connections ? (
        <>
          <p className="text text-l md:text-2xl">
            Showing {connectionType} for {user.fullName}
          </p>

          <div className="flex flex-col w-full gap-3 py-5 md:w-[50%]">
            {connections.length > 0 ? (
              connections.map((connection: Profile.Conneciton) => (
                <UserProfileTile
                  key={connection.userId}
                  userId={connection.userId}
                  fullName={connection.fullName}
                  profilePictureUrl={connection.profilePictureUrl}
                  username={connection.username}
                  isFollowing={connection.isFollowing}
                  currentUserId={currentUserId}
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
