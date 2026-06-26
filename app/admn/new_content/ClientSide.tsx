'use client';

import { useState } from 'react';
import NewPromoter from './components/NewPromoter';
import NewArtist from './components/NewArtist';
import NewSong from './components/NewSong';
import { Genre } from '@MusicMe/types/Genre';

const contentTypes = [
  { label: 'Artist', value: 'artist' },
  { label: 'Promoter', value: 'promoter' },
  { label: 'Song', value: 'song' },
];

export default function AdminClientSideContent({ genres }: { genres: Genre[] }) {
  const [contentType, setContentType] = useState(contentTypes[0].value);

  return (
    <>
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
      {contentType === 'song' && <NewSong />}
    </>
  );
}
