'use client';

import { HighlightedSong } from '@MusicMe/types/Profile';
import { SongData } from '@MusicMe/types/Song';
import clsx from 'clsx';
import Image from 'next/image';
import { useState } from 'react';
import { SongSearchModalSmall } from './SongSearchModal';

interface HighlightedSongTileProps {
  highlightedSong: HighlightedSong;
  isCurrentUser: boolean;
}

export const HighlightedSongTile = ({ highlightedSong: initialHighlightedSong, isCurrentUser }: HighlightedSongTileProps) => {
  const [highlightedSong, setHighlightedSong] = useState(initialHighlightedSong);

  const handleSongSelected = (song: SongData) => {
    setHighlightedSong({
      id: song.id,
      name: song.name,
      imageUrl: song.imageUrl ?? '',
      artists: song.artists.map((artist) => ({ id: artist.id, name: artist.name })),
    });
  };
  const showNewHighlightedSongModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const modal = document.getElementById('song-search-modal') as HTMLDialogElement | null;
    if (!modal) {
      return console.log('Modal missing from page');
    }
    modal.showModal();
  };

  return (
    <div className="flex flex-col gap-4 items-center">
      <h2 className="text-2xl font-bold text-center">Highlighted Song</h2>
      <a className={clsx('flex', isCurrentUser ? '' : 'grow', 'max-w-60')} href={`/song/${highlightedSong.id}`}>
        <div
          className={clsx(
            'flex items-center gap-3 bg-base-300 w-[280px] overflow-hidden',
            isCurrentUser ? 'rounded-l-lg' : 'grow rounded-lg',
          )}
        >
          <Image src={highlightedSong.imageUrl} alt="" className="h-16" width={64} height={64} />
          <div className="text-start flex-1">
            <p>{highlightedSong.name}</p>
            <p className="opacity-60">{highlightedSong.artists[0].name}</p>
          </div>
        </div>
        {isCurrentUser && (
          <button
            className="w-10 bg-gray-700 grow flex items-center rounded-r-lg cursor-pointer"
            onClick={(e) => showNewHighlightedSongModal(e)}
          >
            <i className="fa-regular fa-pen-to-square fa-small flex-1"></i>
          </button>
        )}
      </a>
      <SongSearchModalSmall modalId="song-search-modal" onSongSelected={handleSongSelected} />
    </div>
  );
};
