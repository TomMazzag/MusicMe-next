import { pluraliseAndReturnString } from '@MusicMe/lib/util';
import { Profile } from '@MusicMe/types/Profile';



export const ProfileImageAndNumbers = ({ profile }: { profile: Profile.User }) => {
    return (
      <div className="flex px-4 mb-4">
        <img
          src={profile.profile_picture_url}
          alt=""
          className="rounded-full w-[32vw] h-[32vw] mr-4 lg:w-[15vw] lg:h-[15vw] lg:mr-10 object-cover"
        />
        <div className="grow flex flex-col justify-center gap-5">
          <div className="text-center">
            <h2 className="text-3xl font-bold">{profile.full_name}</h2>
            <p className="opacity-70">@{profile.username}</p>
          </div>
          <div className="flex gap-5 justify-center mb-2.5 text-center">
            <div>
              <a href={`/user/${profile.user_id}/followers`} className="hover:text-accent">
                <h2>{profile.followers}</h2>
                <p className="text-sm">{pluraliseAndReturnString(profile.followers, 'follower')}</p>
              </a>
            </div>
            <div>
              <a href={`/user/${profile.user_id}/following`} className="hover:text-accent">
                <h2>{profile.following}</h2>
                <p className="text-sm">following</p>
              </a>
            </div>
            <div>
              <a href={`/user/${profile.user_id}/reviews`} className="hover:text-accent">
                <h2>{profile.review_count}</h2>
                <p className="text-sm">{pluraliseAndReturnString(profile.review_count, 'review')}</p>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
};
