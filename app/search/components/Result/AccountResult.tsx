import { Profile } from '@MusicMe/types/Profile';

export default function AccountResult({ result }: { result: { items: Profile.Public[] } }) {
  return (
    <>
      {result.items.map((user, index: number) => (
        <a href={`/user/${user.userId}`} key={index}>
          <div className="flex items-center gap-10 px-8 py-1">
            <img src={user.profilePictureUrl} alt="" className="rounded-[50%] w-32 h-32 object-cover" />
            <div>
              <h1 className="text text-2xl">{user.fullName}</h1>
              <p className="text opacity-70">@{user.username}</p>
            </div>
          </div>
        </a>
      ))}
    </>
  );
}
