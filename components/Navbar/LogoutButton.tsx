'use client';

import { SignOutButton } from '@clerk/nextjs';

export const LogoutLink = () => {
  return (
    <SignOutButton>
      <p>Logout</p>
    </SignOutButton>
  );
};
