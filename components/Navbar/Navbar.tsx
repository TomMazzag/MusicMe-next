'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { useUser } from '@MusicMe/context/UserContext';
import { useState } from 'react';

export const Navbar = () => {
  const { user, loading } = useUser();
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <nav className="navbar bg-base-100 border-b-2 border-accent">
      <div className="flex-1">
        <a href="/account" className="btn btn-ghost text-4xl">
          MusicMe
        </a>
      </div>
      <div className="mobile-menu md:hidden">
        <ul className="menu menu-horizontal rounded-box">
          <li>
            <a href="/feed">
              <i className="fa-brands fa-discourse fa-xl"></i>
            </a>
          </li>
          <li>
            <a href="/search">
              <i className="fa-solid fa-magnifying-glass fa-xl"></i>
            </a>
          </li>
        </ul>
        <div className="dropdown dropdown-end">
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
        </div>
      </div>
      <div className="flex-none gap-2 hidden md:inline-flex">
        <div className="flex-1">
          <a href="/feed" className="btn btn-ghost text-xl">
            Feed
          </a>
        </div>
        <div className="flex-1">
          <a href="/discover" className="btn btn-ghost text-xl">
            Discover
          </a>
        </div>
        <div className="flex-1">
          <a href="/search" className="btn btn-ghost text-xl">
            Search
          </a>
        </div>
        <div className="dropdown dropdown-end mr-2">
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
          <ul tabIndex={0} className="mt-3 z-1 p-2 shadow menu menu-sm dropdown-content bg-base-300 rounded-box w-40">
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
        </div>
      </div>
    </nav>
  );
};
