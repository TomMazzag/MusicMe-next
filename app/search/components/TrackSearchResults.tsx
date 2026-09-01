'use client';

import { useQuery } from '@tanstack/react-query';
import { mapDbSongToSearchTrack, mergeTrackSearchResults } from '@MusicMe/lib/songSearch';
import { TrackResult } from './Result/TrackResult';
import { Category } from './SearchClientSide';

interface Props {
  query: string;
  category: Category;
}

export default function TrackSearchResults({ query, category }: Props) {
  const { data: dbTracks, isLoading: isDbLoading } = useQuery({
    queryKey: ['trackSearch', 'db', query],
    queryFn: async () => {
      const req = await fetch(`/api/song/db/search?query=${encodeURIComponent(query)}`);
      const data = await req.json();
      return (data.results ?? []).map(mapDbSongToSearchTrack);
    },
    enabled: query.length > 1,
  });

  const { data: externalTracks, isLoading: isExternalLoading } = useQuery({
    queryKey: ['trackSearch', 'external', query, category],
    queryFn: async () => {
      const req = await fetch(`/api/song/search?category=${category}&query=${encodeURIComponent(query)}`);
      if (!req.ok) {
        return [];
      }
      const data = await req.json();
      return data.items ?? [];
    },
    enabled: query.length > 1,
  });

  const items = mergeTrackSearchResults(dbTracks ?? [], externalTracks ?? []);
  const isLoading = isDbLoading && isExternalLoading;
  const isExternalPending = isExternalLoading && !isDbLoading;

  if (isLoading) {
    return (
      <>
        <div className="skeleton h-28 w-2/3"></div>
        <div className="skeleton h-28 w-2/3"></div>
        <div className="skeleton h-28 w-2/3"></div>
        <div className="skeleton h-28 w-2/3"></div>
      </>
    );
  }

  if (items.length === 0 && !isExternalLoading) {
    return <p className="text text-xl mt-20">No results ...</p>;
  }

  return (
    <>
      {items.length > 0 && <TrackResult result={{ items }} />}
      {isExternalPending && (
        <>
          <div className="skeleton h-28 w-2/3"></div>
          <div className="skeleton h-28 w-2/3"></div>
        </>
      )}
    </>
  );
}
