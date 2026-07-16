'use client';

import { Tabs } from "./ClientSideContainer";

export const TabChanger = ({ tab, setTab }: { tab: Tabs; setTab: (tab: Tabs) => void }) => {
  const updateTab = (tab: Tabs) => {
    setTab(tab);
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
