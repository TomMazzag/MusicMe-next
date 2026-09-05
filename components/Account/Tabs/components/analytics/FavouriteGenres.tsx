'use client';

import { ProfileBadges } from '@MusicMe/app/(discover)/discover/components/Genre/GenreBadges';
import { PlatformGenres } from '@MusicMe/types/Genre';
import { useState } from 'react';
import { FavouriteGenresModal } from './FavouriteGenresModal';
import clsx from 'clsx';

const FAVOURITE_GENRES_MODAL_ID = 'favourite-genres-modal';

interface FavouriteGenresTileProps {
  favouriteGenres: string[];
  isCurrentUser?: boolean;
}

const isPlatformGenre = (genre: string): genre is PlatformGenres => genre in ProfileBadges;

export const FavouriteGenresTile = ({ favouriteGenres, isCurrentUser = false }: FavouriteGenresTileProps) => {
  const [validGenres, setValidGenres] = useState(favouriteGenres.filter(isPlatformGenre));

  const openFavouriteGenresModal = () => {
    const modal = document.getElementById(FAVOURITE_GENRES_MODAL_ID) as HTMLDialogElement | null;
    if (!modal) {
      return console.log('Modal missing from page');
    }
    modal.showModal();
  };

  if (validGenres.length === 0) {
    return (
      <div className="flex flex-col gap-4 items-center">
        <h2 className="text-2xl font-bold text-center">Favourite Genres</h2>
        {isCurrentUser ? (
          <div className="bg-base-200 flex items-center justify-center gap-3 rounded-lg">
            <p className="text-center pl-4">No favourite genres found</p>
            <button
              type="button"
              className="w-10 bg-gray-700 grow flex items-center rounded-r-lg cursor-pointer h-full py-3 hover:bg-gray-600"
              onClick={openFavouriteGenresModal}
            >
              <i className="fa-regular fa-pen-to-square fa-small flex-1"></i>
            </button>
          </div>
        ) : (
          <p className="text-center">No favourite genres found</p>
        )}
        {isCurrentUser && (
          <FavouriteGenresModal
            modalId={FAVOURITE_GENRES_MODAL_ID}
            currentGenres={validGenres}
            onSave={setValidGenres}
          />
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="group flex items-center justify-center gap-1">
        <h2 className="text-2xl font-bold text-center">Favourite Genres</h2>
        {isCurrentUser && (
          <div
            className={clsx(
              'grid grid-cols-[0fr] overflow-hidden opacity-0 pointer-events-none',
              'transition-[grid-template-columns,opacity] duration-500 ease-out',
              'group-hover:grid-cols-[1fr] group-hover:opacity-100 group-hover:pointer-events-auto',
              'group-focus-within:grid-cols-[1fr] group-focus-within:opacity-100 group-focus-within:pointer-events-auto',
            )}
          >
            <div className="min-w-0">
              <button
                type="button"
                className="flex items-center cursor-pointer h-full p-2 rounded-sm hover:bg-gray-600 transition-colors duration-200"
                onClick={openFavouriteGenresModal}
              >
                <i className="fa-regular fa-pen-to-square fa-small flex-1"></i>
              </button>
            </div>
          </div>
        )}
      </div>
      <div className="flex flex-wrap justify-center gap-3">
        {validGenres.map((genreKey) => (
          <a key={genreKey} href={`/genre/${genreKey}`} className="hover:scale-105 transition-transform">
            {ProfileBadges[genreKey].component}
          </a>
        ))}
      </div>
      {isCurrentUser && (
        <FavouriteGenresModal modalId={FAVOURITE_GENRES_MODAL_ID} currentGenres={validGenres} onSave={setValidGenres} />
      )}
    </div>
  );
};
