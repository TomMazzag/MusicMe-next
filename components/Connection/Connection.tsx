'use client';

import { SignInButton, useAuth } from '@clerk/nextjs';
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

function mergeFollowing(friends: Profile.FollowingFriend[], artists: Profile.FollowingArtist[]): Profile.FollowingItem[] {
  const withTypes: Profile.FollowingItem[] = [
    ...friends.map((friend) => ({ ...friend, type: 'friend' as const })),
    ...artists.map((artist) => ({ ...artist, type: 'artist' as const })),
  ];

  return withTypes.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

const signInPrompt: Record<ConnectionProps['connectionType'], string> = {
  following: 'Please sign in to see who this user is following',
  followers: 'Please sign in to see who follows this user',
};

export default function Connection({ connectionType, userId }: ConnectionProps) {
  const [connections, setConnections] = useState<Profile.FollowingItem[] | null>(null);
  const [user, setUser] = useState<User>();
  const currentUserId = useUserId();
  const { isLoaded, isSignedIn } = useAuth();

  useEffect(() => {
    if (!isLoaded || !isSignedIn || !userId) {
      return;
    }
    fetch(`/api/user/connection?userId=${userId}&type=${connectionType}`)
      .then((res) => res.json())
      .then((data) => {
        setUser(data.user);
        if (connectionType === 'following') {
          const friends = (data.friends ?? []).map((friend: Omit<Profile.FollowingFriend, 'type'>) => ({
            ...friend,
            createdAt: new Date(friend.createdAt).toISOString(),
          }));
          const artists = (data.artists ?? []).map((artist: Omit<Profile.FollowingArtist, 'type'>) => ({
            ...artist,
            createdAt: new Date(artist.createdAt).toISOString(),
          }));
          setConnections(mergeFollowing(friends, artists));
        } else {
          const friends = (data.friends ?? []).map((friend: Omit<Profile.FollowingFriend, 'type'>) => ({
            ...friend,
            type: 'friend' as const,
            createdAt: new Date(friend.createdAt).toISOString(),
          }));
          setConnections(friends);
        }
      });
  }, [connectionType, userId, isLoaded, isSignedIn]);

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center p-5 md:p-10 min-h-[40vh]">
        <ScaleLoader color={'#22c55e'} />
      </div>
    );
  }

  if (!isSignedIn) {
    return (
      <div className="flex flex-col gap-5 items-center justify-center p-5 md:p-10 min-h-[40vh] text-center">
        <p className="text-lg md:text-2xl">{signInPrompt[connectionType]}</p>
        <SignInButton forceRedirectUrl="/post-auth" mode="modal">
          <button type="button" className="btn btn-outline btn-primary">
            Sign in
          </button>
        </SignInButton>
      </div>
    );
  }

  return (
    <div className="flex items-center p-5 md:p-10 flex-col">
      {user && connections !== null ? (
        <>
          <p className="text text-l md:text-2xl">
            Showing {connectionType} for {user.fullName}
          </p>

          <div className="flex flex-col w-full gap-3 py-5 md:w-[50%]">
            {connections.length > 0 ? (
              connections.map((connection) =>
                connection.type === 'friend' ? (
                  <UserProfileTile
                    key={connection.userId}
                    userId={connection.userId}
                    fullName={connection.fullName}
                    profilePictureUrl={connection.profilePictureUrl}
                    username={connection.username}
                    isFollowing={connection.isFollowing}
                    createdAt={connection.createdAt}
                    currentUserId={currentUserId}
                  />
                ) : (
                  <div key={connection.id} className="flex justify-between py-2 px-2">
                    <a className="flex gap-4 cursor-pointer grow" href={`/artist/${connection.id}`}>
                      {connection.imageUrl ? (
                        <img src={connection.imageUrl} alt="" className="w-20 h-20 object-cover rounded-[50%]" />
                      ) : (
                        <div className="w-20 h-20 rounded-[50%] bg-base-200 flex items-center justify-center shrink-0">
                          <i className="fa-solid fa-user text-2xl opacity-40"></i>
                        </div>
                      )}
                      <div className="flex flex-col justify-center">
                        <h3>{connection.name}</h3>
                        <p className="opacity-55">Artist</p>
                      </div>
                    </a>
                  </div>
                ),
              )
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
