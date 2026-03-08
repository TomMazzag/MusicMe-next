import { ProfileImageAndNumbers } from '@MusicMe/components/Account/ProfilePicAndUserStats';
import { getAccountDetailsUsersAccount } from '@MusicMe/lib/user';

export default async function AccountPage() {
  const user = await getAccountDetailsUsersAccount();

  return (
    <div className="flex flex-col gap-5 items-center mt-5">
      <div className="flex mb-8.75 flex-col">
        <ProfileImageAndNumbers profile={user} />
      </div>
    </div>
  );
}