import { ProfileImageAndNumbers } from '@MusicMe/components/Account/ProfilePicAndUserStats';
import { TabSection } from '@MusicMe/components/Account/TabSection';
import { Navbar } from '@MusicMe/components/Navbar/Navbar';
import { getAccountDetailsByUuid } from '@MusicMe/lib/user';

type Props = {
  params: Promise<{
    uuid: string;
  }>;
};

export default async function UserPage({ params }: Props) {
  const { uuid } = await params;
  const user = await getAccountDetailsByUuid(uuid);

  return (
    <>
      <Navbar />
      <div className="flex flex-col gap-5 items-center mt-10">
        <div className="flex mb-8.75 flex-col">
          <ProfileImageAndNumbers profile={user} isCurrentUser={user.isCurrentUser} isFollowing={user.isFollowing}/>
        </div>

        <TabSection playlists={[]} userId={user.userId} analytics={{ reviewCount: user.reviewCount, likedSongs: user.likedSongCount }}/>
      </div>
    </>
  );
}
