'use client';

import { JSX } from 'react';

interface TablistProps {
  activeTab: string;
  setActiveTab: Function;
  tabContent: JSX.Element;
}

export const Tablist = ({ activeTab, setActiveTab, tabContent }: TablistProps) => {
  return (
    <>
      <div role="tablist" className="tabs tabs-box mb-2 md:mb-10">
        <a
          role="tab"
          className={`tab ${activeTab === 'Playlists' ? 'tab-active [--tab-bg:#00cdb7]' : ''}`}
          onClick={() => setActiveTab('Playlists')}
        >
          Playlists
        </a>
        <a
          role="tab"
          className={`tab cursor-not-allowed ${activeTab === 'Liked' ? 'tab-active [--tab-bg:var(--a)]' : ''}`}
          //   onClick={() => setActiveTab('Liked')}
        >
          Liked songs
        </a>
        <a
          role="tab"
          className={`tab cursor-not-allowed ${activeTab === 'Analytics' ? 'tab-active [--tab-bg:var(--accent)]' : ''}`}
          //   onClick={() => setActiveTab('Analytics')}
        >
          Stats
        </a>
      </div>

      <div>{tabContent}</div>
    </>
  );
};
