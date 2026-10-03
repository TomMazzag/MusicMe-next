import { ArtistDetail } from '@MusicMe/types/Artist';
import { BACKEND_URL_SERVER } from './util';
import { authenticatedRequest } from './backend';

export const getArtistById = async (artistId: string): Promise<ArtistDetail | null> => {
  const response = await authenticatedRequest(`${BACKEND_URL_SERVER}/artist/${artistId}`, { method: 'GET' });

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error(`Failed to fetch artist, status code: ${response.status}`);
  }

  const data = await response.json();
  return data.artist as ArtistDetail;
};
