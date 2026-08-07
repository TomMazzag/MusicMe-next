'use client';

import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { Tabs } from "./ClientSideContainer";

interface TabChangerProps {
  tab: Tabs;
  setTab: (tab: Tabs) => void;
  createQueryString: (name: string, value: string) => string;
  router: AppRouterInstance;
  pathname: string;
}

export const TabChanger = ({ tab, setTab, createQueryString, router, pathname }: TabChangerProps) => {
  const updateTab = (tab: Tabs) => {
    setTab(tab);
    createQueryString('tab', tab);
    router.push(`${pathname}?${createQueryString('tab', tab)}`);
  };

  return (
    <ul className="menu bg-base-300 text-base-content min-h-full w-56 p-4 text-lg">
      <li>
        <a className={tab === 'general' ? 'text-accent' : ''} onClick={() => updateTab('general')}>
          General
        </a>
        <a className={tab === 'connections' ? 'text-accent' : ''} onClick={() => updateTab('connections')}>
          Connections
        </a>
      </li>
    </ul>
  );
};
