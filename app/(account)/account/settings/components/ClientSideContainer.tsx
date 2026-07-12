'use client';
import { useState } from 'react';
import { General } from './General';
import { TabChanger } from './TabChanger';
import { useUser } from '@clerk/nextjs';

export const ClientSideContainer = () => {
  const [tab] = useState('general');
  const { user, isLoaded: isUserLoaded } = useUser();

  let pageContent;
  switch (tab) {
    case 'general':
      pageContent = <General user={user} isUserLoaded={isUserLoaded} />;
      break;
    default:
      pageContent = <General user={user} isUserLoaded={isUserLoaded} />;
  }

  return (
    <>
      <div className="drawer-content flex flex-col items-center justify-center mt-8 sm:mt-0 sm:h-[90vh]">
        {pageContent}
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
        <TabChanger />
      </div>
    </>
  );
};
