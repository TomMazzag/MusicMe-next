import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useUser } from '@MusicMe/context/UserContext';
import { Profile } from '@MusicMe/types/Profile';
import { useState } from 'react';

export const UserProfileButton = () => {
  const { user, loading, userNotFound } = useUser();
  const [imgLoaded, setImgLoaded] = useState(false);

  if (!loading && userNotFound) {
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
          {!imgLoaded && (
            <FontAwesomeIcon
              icon={faCircleUser}
              className="absolute inset-0 text-[2.5rem]"
              style={{ width: '2.5rem', height: '2.5rem', margin: 0 }}
            />
          )}
          {user && (
            <img
              src={user?.profile_picture_url}
              alt={'User profile image'}
              onLoad={() => setImgLoaded(true)}
              className={`absolute w-full h-full object-cover transition-opacity duration-300 rounded-full ${
                imgLoaded ? 'opacity-100' : 'opacity-50'
              }`}
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
          <a href="/">Logout</a>
        </li>
      </ul>
    </>
  );
};
