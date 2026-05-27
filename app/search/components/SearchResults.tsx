'use client';

import { useQuery } from '@tanstack/react-query';
import { Category } from './SearchClientSide';
import { TrackResult } from './Result/TrackResult';
import AccountResult from './Result/AccountResult';
import { useDebouncedValue } from '@MusicMe/lib/debounce';

interface SearchResultsParams {
  category: Category;
  query: string;
}

const TEMP_DISABLED_CATEGORIES: Category[] = ['Album', 'Artist'];

export default function SearchResults({ query, category }: SearchResultsParams) {
  const debouncedQuery = useDebouncedValue(query, 500);
  const { data: result, isLoading } = useQuery({
    queryKey: ['searchResult', debouncedQuery, category],
    queryFn: async () => {
      if (query.length === 0 || TEMP_DISABLED_CATEGORIES.includes(category)) {
        return [];
      }

      if (query.length > 1 && category !== 'Username') {
        const req = await fetch(`/api/song/search?category=${category}&query=${query}`);
        const data = await req.json();
        return data;
      }

      if (category === 'Username') {
        const req = await fetch(`/api/user/search?username=${query}`);
        const data = await req.json();
        return data.request;
      }

      return [];
    },
  });

  console.log(result)

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
              return <TrackResult result={result} />;
            case 'Username':
              return <AccountResult result={result} />
          }
        })()}
      {query.length > 1 && result && result.length < 1 && <p className="text text-xl mt-20">No results ...</p>}
    </div>
  );
}
