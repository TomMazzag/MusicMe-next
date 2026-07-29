'use client';

import { ProfileBadges } from '@MusicMe/app/(discover)/discover/components/Genre/GenreBadges';
import { PlatformGenres } from '@MusicMe/types/Genre';

interface FavouriteGenresTileProps {
  favouriteGenres: string[];
}

const isPlatformGenre = (genre: string): genre is PlatformGenres => genre in ProfileBadges;

export const FavouriteGenresTile = ({ favouriteGenres }: FavouriteGenresTileProps) => {
  const validGenres = favouriteGenres.filter(isPlatformGenre);

  if (validGenres.length === 0) {
    return (
      <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-bold text-center">Favourite Genres</h2>
        <p className="text-center">No favourite genres found</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold text-center">Favourite Genres</h2>
      <div className="flex flex-wrap justify-center gap-3">
        {validGenres.map((genreKey) => (
          <a key={genreKey} href={`/genre/${genreKey}`} className="hover:scale-105 transition-transform">
            {ProfileBadges[genreKey].component}
          </a>
        ))}
      </div>
    </div>
  );
};
