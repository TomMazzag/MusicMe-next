import { Genre } from '@MusicMe/types/Genre';
import { BACKEND_URL, BACKEND_URL_SERVER, DEFAULT_GET_OPTIONS } from './util';

export const getTopViewedTracks = async () => {
  const response = await fetch(`${BACKEND_URL}/song/views/top`, DEFAULT_GET_OPTIONS);

  let data = await response.json();
  return data;
};

export const getTopReviews = async () => {
  const response = await fetch(`${BACKEND_URL}/rating/top`, DEFAULT_GET_OPTIONS);

  let data = await response.json();
  return data;
};

export const getAllGenres = async () => {
  const response = await fetch(`${BACKEND_URL}/genre/get_all`, { method: 'GET' });

  let data = await response.json();
  return data as { genres: Genre[] };
};

export const getGenreByKey = async (genreKey: string) => {
  const response = await fetch(`${BACKEND_URL_SERVER}/genre/${genreKey}`, { method: 'GET' });

  let data = await response.json();
  return data as { genre: Genre };
};
