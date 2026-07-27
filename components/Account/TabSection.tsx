'use client';

import { ActiveTab } from '@MusicMe/types/Profile';
import { PlaylistsTab } from './Tabs/PlaylistTab';
import { LikedSongsTab } from './Tabs/LikedSongsTab';
import { useRouter, useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useMemo, useState } from 'react';
import { AnalyticsTab } from './Tabs/Analytics';
import { Analytics } from '@MusicMe/types/Analytics';
import {
  LIKED_SONGS_CLIENT_SORT_THRESHOLD,
  LikedSongSort,
  LikedSongsResponse,
} from '@MusicMe/types/LikedSong';
import { parseLikedSongSort, sortLikedSongs } from '@MusicMe/lib/likedSongs';

interface TabSectionProps {
  playlists: SpotifyApi.PlaylistObjectFull[] | undefined;
  userId?: string;
  analytics: Analytics;
}

export const TabSection = ({ playlists, userId, analytics }: TabSectionProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const likedSort = parseLikedSongSort(searchParams.get('likedSort'));
  const [totalCount, setTotalCount] = useState<number | null>(null);

  const serverSortEnabled = totalCount !== null && totalCount >= LIKED_SONGS_CLIENT_SORT_THRESHOLD;

  const { data: likedSongsData, isLoading: likedSongsLoading } = useQuery<LikedSongsResponse>({
    queryKey: ['likedSongs', userId, serverSortEnabled ? likedSort : 'client'],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (userId) params.set('user_id', userId);
      params.set('sort', likedSort);

      const req = await fetch(`/api/song/liked_songs?${params.toString()}`);
      const data = await req.json();
      return data;
    },
  });

  useEffect(() => {
    if (likedSongsData?.totalCount !== undefined) {
      setTotalCount(likedSongsData.totalCount);
    }
  }, [likedSongsData?.totalCount]);

  const displayedLikedSongs = useMemo(() => {
    if (!likedSongsData?.likedSongs) return undefined;
    if (serverSortEnabled) return likedSongsData.likedSongs;
    return sortLikedSongs(likedSongsData.likedSongs, likedSort);
  }, [likedSongsData?.likedSongs, likedSort, serverSortEnabled]);

  const paramTab = searchParams.get('activeTab') as ActiveTab | null;
  const [activeTab, setActiveTabState] = useState<ActiveTab>(paramTab ?? 'Liked');

  useEffect(() => {
    const param = searchParams.get('activeTab') as ActiveTab | null;
    if (param && param !== activeTab) {
      setActiveTabState(param);
    }
  }, [searchParams]);

  /** User id is only passed when found in the url */
  const isCurrentUser = userId === undefined;

  const setActiveTab = (newTab: ActiveTab) => {
    setActiveTabState(newTab);

    const params = new URLSearchParams(searchParams.toString());
    params.set('activeTab', newTab);
    router.push(`?${params.toString()}`);
  };

  const setLikedSort = (sort: LikedSongSort) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('likedSort', sort);
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
        <LikedSongsTab
          hidden={activeTab !== 'Liked'}
          likedSongs={displayedLikedSongs}
          isLoading={likedSongsLoading}
          sort={likedSort}
          onSortChange={setLikedSort}
        />
        <AnalyticsTab hidden={activeTab !== 'Analytics'} analyticsData={analytics} isCurrentUser={isCurrentUser} />
      </div>
    </>
  );
};
