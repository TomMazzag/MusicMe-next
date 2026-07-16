import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { LogoutLink } from './LogoutButton';
import Image from 'next/image';

export const UserProfileButton = ({ imageUrl }: { imageUrl: string | undefined }) => {
  if (!imageUrl) {
    return (
      <>
        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle border-0">
          <div className="w-10 h-10 rounded-full relative box-content">
            <FontAwesomeIcon
              icon={faCircleUser}
              className="absolute inset-0 text-[2.5rem]"
              style={{ width: '2.5rem', height: '2.5rem', margin: 0 }}
            />
          </div>
        </div>
        <ul tabIndex={0} className="mt-3 z-1 shadow menu menu-sm dropdown-content bg-base-300 rounded-box w-40">
          <li>
            <a href="/">Login</a>
          </li>
        </ul>
      </>
    );
  }

  return (
    <>
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle border-0">
        <div className="w-10 h-10 rounded-full relative box-content">
          {imageUrl && (
            <Image
              src={imageUrl}
              alt={'User profile image'}
              width={40}
              height={40}
              className={'w-10 h-10 absolute object-cover rounded-full'}
            />
          )}
        </div>
      </div>

      <ul tabIndex={0} className="mt-3 z-1 shadow menu menu-sm dropdown-content bg-base-300 rounded-box w-40">
        <li>
          <a href="/account">Profile</a>
        </li>
        <li>
          <a href="/account/settings">Settings</a>
        </li>
        <li>
          <LogoutLink />
        </li>
      </ul>
    </>
  );
};
