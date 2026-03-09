import { ProfileImageAndNumbers } from '@MusicMe/components/Account/ProfilePicAndUserStats';
import { TabSection } from '@MusicMe/components/Account/TabSection';
import { getPlaylists } from '@MusicMe/lib/spotify';
import { getAccountDetailsUsersAccount } from '@MusicMe/lib/user';

export default async function AccountPage() {
  const user = await getAccountDetailsUsersAccount();
  const playlists = await getPlaylists(user.spotify_id);

  return (
    <div className="flex flex-col gap-5 items-center mt-10">
      <div className="flex mb-8.75 flex-col">
        <ProfileImageAndNumbers profile={user} />
      </div>

      <TabSection playlists={playlists} likedSongs={[]} />
    </div>
  );
}
