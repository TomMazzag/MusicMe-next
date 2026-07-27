import { SongData } from './Song';

export type LikedSongSort =
  | 'name-asc'
  | 'name-desc'
  | 'liked-new'
  | 'liked-old'
  | 'release-new'
  | 'release-old';

export const LIKED_SONG_SORT_OPTIONS: { value: LikedSongSort; label: string }[] = [
  { value: 'liked-new', label: 'Date liked (newest)' },
  { value: 'liked-old', label: 'Date liked (oldest)' },
  { value: 'name-asc', label: 'Alphabetical (A-Z)' },
  { value: 'name-desc', label: 'Alphabetical (Z-A)' },
  { value: 'release-new', label: 'Release date (newest)' },
  { value: 'release-old', label: 'Release date (oldest)' },
];

export const DEFAULT_LIKED_SONG_SORT: LikedSongSort = 'liked-new';

export const LIKED_SONGS_CLIENT_SORT_THRESHOLD = 50;

export interface LikedSongData extends SongData {
  likedAt: string;
}

export interface LikedSongsResponse {
  likedSongs: LikedSongData[];
  totalCount: number;
}
