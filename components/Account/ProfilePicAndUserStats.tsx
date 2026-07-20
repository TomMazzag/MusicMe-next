import { pluraliseAndReturnString } from '@MusicMe/lib/util';
import { Profile } from '@MusicMe/types/Profile';
import { FollowButton } from './FollowButton';
import Image from 'next/image';


interface ProfileHeaderProps {
  profile: Profile.Public;
  isCurrentUser: boolean;
  isFollowing?: boolean;
}


export const ProfileImageAndNumbers = ({ profile, isCurrentUser, isFollowing = false }: ProfileHeaderProps) => {
    return (
      <div className="flex px-4 mb-4 items-center">
        <Image
          width={200}
          height={200}
          src={profile.profilePictureUrl}
          alt=""
          className="rounded-full w-[32vw] h-[32vw] mr-4 lg:w-[15vw] lg:h-[15vw] lg:mr-10 object-cover"
        />
        <div className="grow flex flex-col justify-center gap-5">
          <div className="text-center">
            <h2 className="text-3xl font-bold">{profile.fullName}</h2>
            <p className="opacity-70">@{profile.username}</p>
          </div>
          <div className="flex gap-4 justify-between mb-2.5 text-center">
            <div className="min-w-15">
              <a href={`/user/${profile.userId}/followers`} className="hover:text-accent">
                <h2>{profile.followers}</h2>
                <p className="text-sm">{pluraliseAndReturnString(profile.followers, 'follower')}</p>
              </a>
            </div>
            <div className="min-w-15">
              <a href={`/user/${profile.userId}/following`} className="hover:text-accent">
                <h2>{profile.following}</h2>
                <p className="text-sm">following</p>
              </a>
            </div>
            <div className="min-w-15">
              <a href={`/user/${profile.userId}/reviews`} className="hover:text-accent">
                <h2>{profile.reviewCount}</h2>
                <p className="text-sm">{pluraliseAndReturnString(profile.reviewCount, 'review')}</p>
              </a>
            </div>
          </div>
          {!isCurrentUser && (
            <FollowButton isFollowing={isFollowing} userId={profile.userId} />
          )}
        </div>
      </div>
    );
};
