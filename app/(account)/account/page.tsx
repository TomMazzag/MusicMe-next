import { currentUser } from '@clerk/nextjs/server';
import { ProfileImageAndNumbers } from '@MusicMe/components/Account/ProfilePicAndUserStats';
import { TabSection } from '@MusicMe/components/Account/TabSection';
import { Navbar } from '@MusicMe/components/Navbar/Navbar';
// import { getPlaylists } from '@MusicMe/lib/spotify';
import { getAccountDetailsUsersAccount } from '@MusicMe/lib/user';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Zenekio | Account',
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AccountPage() {
  const clerkUser = await currentUser();
  if (!clerkUser) {return}
  const user = await getAccountDetailsUsersAccount();
  // const playlists = await getPlaylists(user.spotifyId);

  user.userId = clerkUser.id;
  user.username = clerkUser.username ?? '';
  user.profilePictureUrl = clerkUser.imageUrl;
  user.fullName = (clerkUser.firstName ?? '') + ' ' + (clerkUser.lastName ?? '');

  return (
    <>
      <Navbar />
      <div className="flex flex-col gap-5 items-center mt-10">
        <div className="flex mb-8.75 flex-col">
          <ProfileImageAndNumbers profile={user} isCurrentUser={true}/>
        </div>

        <TabSection playlists={[]} analytics={{ reviewCount: user.reviewCount, likedSongs: user.likedSongCount }} />
      </div>
    </>
  );
}
