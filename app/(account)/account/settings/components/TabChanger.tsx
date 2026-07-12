'use client';
import { useState } from "react";

export const TabChanger = () => {
      const [tab, setTab] = useState('general');

      const updateTab = (tab: string) => {
        setTab(tab);
      };

  return (
    <ul className="menu bg-base-300 text-base-content min-h-full w-56 p-4 text-lg">
      <li>
        <a className={tab === 'general' ? 'text-accent' : ''} onClick={() => updateTab('general')}>
          General
        </a>
      </li>
    </ul>
  );
};