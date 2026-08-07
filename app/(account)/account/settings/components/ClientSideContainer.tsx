'use client';
import { useCallback, useState } from 'react';
import { General } from './General';
import { TabChanger } from './TabChanger';
import { useUser } from '@clerk/nextjs';
import { Connections } from './Connectionts';
import { UserResource } from '@clerk/nextjs/types';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';


export type Tabs = 'general' | 'connections';
export type UserDetails = { user: UserResource | null | undefined; isUserLoaded: boolean };

const isValidTab = (tab: string | null): tab is Tabs => tab === 'general' || tab === 'connections';

export const ClientSideContainer = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const initialTab = searchParams.get('tab');
  const [tab, setTab] = useState<Tabs>(isValidTab(initialTab) ? initialTab : 'general');
  const { user, isLoaded: isUserLoaded } = useUser();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );

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
        <TabChanger tab={tab} setTab={setTab} createQueryString={createQueryString} router={router} pathname={pathname} />
      </div>
    </>
  );
};
