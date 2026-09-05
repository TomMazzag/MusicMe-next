import { PlatformGenres } from '@MusicMe/types/Genre';

export const updateFavouriteGenres = async (genres: PlatformGenres[]): Promise<PlatformGenres[]> => {
  const response = await fetch('/api/user/favourite-genres', {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ genres }),
  });

  if (!response.ok) {
    throw new Error('Failed to update favourite genres');
  }

  const data = await response.json();
  return data.favouriteGenres;
};
