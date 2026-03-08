import { BACKEND_URL } from './util';

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
