'use client';

import { Navbar } from '@MusicMe/components/Navbar/Navbar';
import { getAllGenres } from '@MusicMe/lib/discover';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import NewPromoter from './components/NewPromoter';
import NewArtist from './components/NewArtist';

const contentTypes = [
  { label: 'Artist', value: 'artist' },
  { label: 'Promoter', value: 'promoter' },
];

export default function AdminNewContentPage() {
  const { data: genres } = useQuery({
    queryKey: ['genre'],
    queryFn: () =>
      getAllGenres().then((data) => {
        return data.genres;
      }),
    staleTime: 1000 * 60 * 60 * 24,
  });
  const [contentType, setContentType] = useState(contentTypes[0].value);

  return (
    <>
      <Navbar />
      <div className="h-full flex flex-col items-center justify-center gap-8 my-4">
        <h1 className="text-3xl font-bold">Admin New Content Page</h1>

        <div className="flex flex-col items-center gap-2">
          <p>New Content Type</p>
          <select value={contentType} onChange={(e) => setContentType(e.target.value)}>
            {contentTypes.map((type) => (
              <option value={type.value} key={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>
        {contentType === 'promoter' && <NewPromoter genres={genres} />}
        {contentType === 'artist' && <NewArtist genres={genres} />}
      </div>
    </>
  );
}
