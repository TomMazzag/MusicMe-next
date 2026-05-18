import { cookies } from 'next/headers';
import { BACKEND_URL, BACKEND_URL_SERVER } from './util';
import { Song } from '@MusicMe/types/Song';

interface SpotifyTokenResponse {
  access_token: string;
  refresh_token: string;
  expires_in: number;
}

export const generateSpotifyToken = async (code: string, state: string): Promise<SpotifyTokenResponse> => {
  try {
    const response = await fetch(`${BACKEND_URL}/auth/callback?code=${code}&state=${state}`, { method: 'GET' });
    if (response.status === 200) {
      let data = await response.json();
      return data;
    } else {
      throw new Error(`Failed to get spotify token, status code: ${response.status}`);
    }
  } catch (err) {
    console.error('Error generating spotify token', err);
    throw err;
  }
};

export const getPlaylists = async (userId: string) => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('access_token')?.value;
  if (!accessToken) {
    throw new Error('No access token found in cookies');
  }
  const result = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists?offset=0&limit=50`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  const data = await result.json();

  const publicPlaylists = data.items.filter((item: SpotifyApi.PlaylistObjectFull) => item.public === true);
  return publicPlaylists;
};

export const getSong = async (songId: string) => {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore
    .getAll()
    .map((cookie) => `${cookie.name}=${cookie.value}`)
    .join('; ');
  const response = await fetch(`${BACKEND_URL_SERVER}/song/${songId}`, {
    method: 'GET',
    headers: {
      cookie: cookieHeader,
    },
  });

  let data = await response.json();

  return data as Song;
};
