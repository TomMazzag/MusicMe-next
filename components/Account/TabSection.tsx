'use client';

import { ActiveTab } from '@MusicMe/types/Profile';
import { PlaylistsTab } from './Tabs/PlaylistTab';
import { LikedSongsTab } from './Tabs/LikedSongsTab';
import { useRouter, useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { AnalyticsTab } from './Tabs/Analytics';
import { Analytics } from '@MusicMe/types/Analytics';

interface TabSectionProps {
  playlists: SpotifyApi.PlaylistObjectFull[] | undefined;
  userId?: string;
  analytics: Analytics
}

export const TabSection = ({ playlists, userId, analytics }: TabSectionProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const { data: likedSongs, isLoading: likedSongsLoading } = useQuery({
    queryKey: ['likedSongs'],
    queryFn: async () => {
      const req = await fetch(`/api/song/liked_songs${userId ? `?user_id=${userId}` : ''}`);
      const data = await req.json();
      return data.likedSongs;
    },
  });

  const paramTab = searchParams.get('activeTab') as ActiveTab | null;
  const [activeTab, setActiveTabState] = useState<ActiveTab>(paramTab ?? 'Liked');

  useEffect(() => {
    const param = searchParams.get('activeTab') as ActiveTab | null;
    if (param && param !== activeTab) {
      setActiveTabState(param);
    }
  }, [searchParams]);

  /** User id is only passed when found in the url */
  const isCurrentUser = userId === undefined

  const setActiveTab = (newTab: ActiveTab) => {
    setActiveTabState(newTab);

    const params = new URLSearchParams(searchParams.toString());
    params.set('activeTab', newTab);
    router.push(`?${params.toString()}`);
  };

  return (
    <>
      <div role="tablist" className="tabs tabs-box md:mb-4">
        <a
          role="tab"
          className={`tab ${activeTab === 'Liked' ? 'tab-active [--tab-bg:#00cdb7]' : ''}`}
          onClick={() => setActiveTab('Liked')}
        >
          Liked songs
        </a>
        <a
          role="tab"
          className={`tab ${activeTab === 'Playlists' ? 'tab-active [--tab-bg:#00cdb7]' : ''}`}
          onClick={() => setActiveTab('Playlists')}
        >
          Playlists
        </a>
        <a
          role="tab"
          className={`tab ${activeTab === 'Analytics' ? 'tab-active [--tab-bg:#00cdb7]' : ''}`}
          onClick={() => setActiveTab('Analytics')}
        >
          Analytics
        </a>
      </div>

      <div className="mb-12 w-full flex justify-center">
        <PlaylistsTab hidden={activeTab !== 'Playlists'} playlists={playlists} />
        <LikedSongsTab hidden={activeTab !== 'Liked'} likedSongs={likedSongs} isLoading={likedSongsLoading} />
        <AnalyticsTab hidden={activeTab !== 'Analytics'} analyticsData={analytics} isCurrentUser={isCurrentUser} />
      </div>
    </>
  );
};
