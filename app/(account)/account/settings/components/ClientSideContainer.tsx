'use client';
import { useState } from 'react';
import { General } from './General';
import { TabChanger } from './TabChanger';
import { useUser } from '@clerk/nextjs';
import { Connections } from './Connectionts';
import { UserResource } from '@clerk/nextjs/types';

export type Tabs = 'general' | 'connections'
export type UserDetails = { user: UserResource | null | undefined; isUserLoaded: boolean }

export const ClientSideContainer = () => {
  const [tab, setTab] = useState<Tabs>('general');
  const { user, isLoaded: isUserLoaded } = useUser();

  let pageContent;
  switch (tab) {
    case 'general':
      pageContent = <General user={user} isUserLoaded={isUserLoaded} />;
      break;
    case 'connections':
      pageContent = <Connections user={user} isUserLoaded={isUserLoaded} />;
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
        <TabChanger tab={tab} setTab={setTab} />
      </div>
    </>
  );
};
