'use client';

import { getFeed } from '@MusicMe/lib/feed';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';
import { ScaleLoader } from 'react-spinners';
import { FeedItemTile } from './FeedItemTile';

export function FeedList() {
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const { data, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ['feed'],
    queryFn: ({ pageParam }) => getFeed(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => (lastPage.pagination.hasMore ? lastPage.pagination.page + 1 : undefined),
  });

  useEffect(() => {
    const target = loadMoreRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { rootMargin: '200px' },
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  if (isLoading) {
    return (
      <div className="flex justify-center py-16">
        <ScaleLoader color={'#22c55e'} />
      </div>
    );
  }

  if (isError || !data) {
    return <p className="text-center py-16 opacity-70">Unable to load feed. Please try again later.</p>;
  }

  const items = data.pages.flatMap((page) => page.items);

  return (
    <div className="flex flex-col gap-6 max-w-2xl mx-auto w-full">
      {items.length === 0 ? (
        <p className="text-center py-16 opacity-70">No new songs yet this year.</p>
      ) : (
        <ul className="flex flex-col gap-4">
          {items.map((item) => (
            <li key={item.id}>
              <FeedItemTile item={item} />
            </li>
          ))}
        </ul>
      )}

      <div ref={loadMoreRef} className="flex justify-center py-4 min-h-8">
        {isFetchingNextPage && <ScaleLoader color={'#22c55e'} />}
      </div>
    </div>
  );
}
