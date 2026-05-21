'use client';

import { ActiveTab } from '@MusicMe/types/Profile';
import { Tablist } from './Tablist';
import { PlaylistsTab } from './Tabs/PlaylistTab';
import { LikedSongsTab } from './Tabs/LikedSongsTab';
import { useRouter, useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';

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
      return data.likedSongs
    },
  });

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
      tabContent = <LikedSongsTab likedSongs={likedSongs || []} isLoading={likedSongsLoading} />;
      break;
    case 'Analytics':
      tabContent = <>Analytics section coming soon</>;
      break;
  }

  return <Tablist activeTab={activeTab} setActiveTab={setActiveTab} tabContent={tabContent} />;
};
