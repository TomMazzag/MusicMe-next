'use client';

import ReleasesList from '@MusicMe/components/Song/ReleasesList';
import { BACKEND_URL } from '@MusicMe/lib/util';
import { SongData } from '@MusicMe/types/Song';
import { useQuery } from '@tanstack/react-query';

export default function NewReleases() {
  const { data: tracks, isLoading } = useQuery<SongData[]>({
    queryKey: ['newReleases'],
    queryFn: async () =>
      fetch(BACKEND_URL + '/song/releases/new').then(async (data) => {
        return (await data.json()).releases || [];
      }),
  });

  return <ReleasesList tracks={tracks} isLoading={isLoading} />;
}
