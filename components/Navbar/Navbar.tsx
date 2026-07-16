
import { currentUser } from '@clerk/nextjs/server';
import { UserProfileButton } from './UserProfileButton';

export const Navbar = async () => {
  const user = await currentUser();
  return (
    <nav className="navbar bg-base-100 border-b-2 border-accent">
      <div className="flex-1">
        <a href="/discover" className="btn btn-ghost text-4xl">
          Zenekio
        </a>
      </div>
      <div className="flex items-center md:hidden">
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
          <UserProfileButton imageUrl={user?.imageUrl} />
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
          <UserProfileButton imageUrl={user?.imageUrl} />
        </div>
      </div>
    </nav>
  );
};
