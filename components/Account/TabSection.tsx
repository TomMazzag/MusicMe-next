'use client';

import { ActiveTab } from '@MusicMe/types/Profile';
import { Tablist } from './Tablist';
import { PlaylistsTab } from './Tabs/PlaylistTab';
import { LikedSongsTab } from './Tabs/LikedSongsTab';
import { useRouter, useSearchParams } from 'next/navigation';

interface TabSectionProps {
  playlists: SpotifyApi.PlaylistObjectFull[] | undefined;
  likedSongs: any[];
}

export const TabSection = ({ playlists, likedSongs }: TabSectionProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const activeTab: ActiveTab | null = searchParams.get('activeTab')
    ? (searchParams.get('activeTab') as ActiveTab)
    : 'Playlists';

  const setActiveTab = (newTab: ActiveTab) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('activeTab', newTab);
    router.push(`?${params.toString()}`);
  };

  let tabContent;

  switch (activeTab) {
    case 'Playlists':
      tabContent = <PlaylistsTab playlists={playlists} />;
      break;
    case 'Liked':
      tabContent = <LikedSongsTab likedSongs={likedSongs} />;
      break;
    case 'Analytics':
      tabContent = <>Analytics section coming soon</>;
      break;
  }

  return <Tablist activeTab={activeTab} setActiveTab={setActiveTab} tabContent={tabContent} />;
};
