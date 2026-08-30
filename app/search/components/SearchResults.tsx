'use client';

import { useQuery } from '@tanstack/react-query';
import { Category } from './SearchClientSide';
import { TrackResult } from './Result/TrackResult';
import AccountResult from './Result/AccountResult';
import ArtistResult from './Result/ArtistResult';
import { useDebouncedValue } from '@MusicMe/lib/debounce';
import { Profile } from '@MusicMe/types/Profile';
import { SearchArtist } from '@MusicMe/types/Artist';

interface SearchResultsParams {
  category: Category;
  query: string;
}
interface TrackResults {
  items: SpotifyApi.TrackObjectFull[];
  source?: string;
}
interface ProfileResults {
  items: Profile.User[];
}
interface ArtistResults {
  items: SearchArtist[];
}

const TEMP_DISABLED_CATEGORIES: Category[] = ['Album'];

export default function SearchResults({ query, category }: SearchResultsParams) {
  const debouncedQuery = useDebouncedValue(query, 500);
  const { data: result, isLoading } = useQuery({
    queryKey: ['searchResult', debouncedQuery, category],
    queryFn: async (): Promise<TrackResults | ProfileResults | ArtistResults> => {
      if (debouncedQuery.length === 0 || TEMP_DISABLED_CATEGORIES.includes(category)) {
        return { items: [] };
      }

      if (debouncedQuery.length > 1 && category === 'Track') {
        const req = await fetch(`/api/song/search?category=${category}&query=${debouncedQuery}`);
        const data = await req.json();
        return data;
      }

      if (debouncedQuery.length > 1 && category === 'Artist') {
        const req = await fetch(`/api/artist/search?query=${encodeURIComponent(debouncedQuery)}`);
        const data = await req.json();
        return { items: data.results ?? [] };
      }

      if (category === 'Username') {
        const req = await fetch(`/api/user/search?username=${debouncedQuery}`);
        const data = await req.json();
        return { items: data.request };
      }

      return { items: [] };
    },
  });

  return (
    <div className="flex flex-col gap-12 mb-10 w-full items-center md:w-[70%]">
      {isLoading && (
        <>
          <div className="skeleton h-28 w-2/3"></div>
          <div className="skeleton h-28 w-2/3"></div>
          <div className="skeleton h-28 w-2/3"></div>
          <div className="skeleton h-28 w-2/3"></div>
        </>
      )}
      {result &&
        result.items.length >= 1 &&
        (() => {
          switch (category) {
            case 'Track':
              return <TrackResult result={result as TrackResults} />;
            case 'Username':
              return <AccountResult result={result as ProfileResults} />;
            case 'Artist':
              return <ArtistResult result={result as ArtistResults} />;
          }
        })()}
      {debouncedQuery.length > 1 && result && result.items.length < 1 && (
        <p className="text text-xl mt-20">No results ...</p>
      )}
    </div>
  );
}
