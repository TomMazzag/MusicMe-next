'use client';

import ReleasesList from '@MusicMe/components/Song/ReleasesList';
import { BACKEND_URL } from '@MusicMe/lib/util';
import { SongData } from '@MusicMe/types/Song';
import { useQuery } from '@tanstack/react-query';
import GenrePageSection from './GenrePageSection';

interface NewReleasesProps {
  genreKey: string;
}

export default function NewReleases({ genreKey }: NewReleasesProps) {
  const { data: tracks, isLoading } = useQuery<SongData[]>({
    queryKey: ['newReleases', genreKey],
    queryFn: async () =>
      fetch(`${BACKEND_URL}/genre/${genreKey}/releases/new`).then(async (data) => {
        return (await data.json()).releases || [];
      }),
  });

  return (
    <GenrePageSection id="newReleases" sectionTitle="New Releases">
      <ReleasesList tracks={tracks} isLoading={isLoading} />
    </GenrePageSection>
  );
}
