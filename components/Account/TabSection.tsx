'use client';

import { ActiveTab } from '@MusicMe/types/Profile';
import { PlaylistsTab } from './Tabs/PlaylistTab';
import { LikedSongsTab } from './Tabs/LikedSongsTab';
import { useRouter, useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

interface TabSectionProps {
  playlists: SpotifyApi.PlaylistObjectFull[] | undefined;
}

export const TabSection = ({ playlists }: TabSectionProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const { data: likedSongs, isLoading: likedSongsLoading } = useQuery({
    queryKey: ['likedSongs'],
    queryFn: async () => {
      const req = await fetch('/api/song/liked_songs');
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

  const setActiveTab = (newTab: ActiveTab) => {
    setActiveTabState(newTab);

    const params = new URLSearchParams(searchParams.toString());
    params.set('activeTab', newTab);
    router.push(`?${params.toString()}`);
  };

  return (
    <>
      <div role="tablist" className="tabs tabs-box mb-2 md:mb-10">
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

      <div>
        <PlaylistsTab playlists={playlists} hidden={activeTab !== 'Playlists'} />
        <LikedSongsTab likedSongs={likedSongs || []} isLoading={likedSongsLoading} hidden={activeTab !== 'Liked'} />
        <div className={`${activeTab === 'Analytics' ? 'flex' : 'hidden'}`}>Analytics section coming soon</div>
      </div>
    </>
  );
};
