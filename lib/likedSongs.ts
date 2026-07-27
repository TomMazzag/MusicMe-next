import { LikedSongData, LikedSongSort } from '@MusicMe/types/LikedSong';

function compareReleaseDates(a?: string, b?: string): number {
  if (!a && !b) return 0;
  if (!a) return 1;
  if (!b) return -1;
  return new Date(a).getTime() - new Date(b).getTime();
}

export function sortLikedSongs(songs: LikedSongData[], sort: LikedSongSort): LikedSongData[] {
  const sorted = [...songs];

  switch (sort) {
    case 'name-asc':
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    case 'name-desc':
      return sorted.sort((a, b) => b.name.localeCompare(a.name));
    case 'liked-new':
      return sorted.sort((a, b) => new Date(b.likedAt).getTime() - new Date(a.likedAt).getTime());
    case 'liked-old':
      return sorted.sort((a, b) => new Date(a.likedAt).getTime() - new Date(b.likedAt).getTime());
    case 'release-new':
      return sorted.sort((a, b) => compareReleaseDates(b.releaseDate, a.releaseDate));
    case 'release-old':
      return sorted.sort((a, b) => compareReleaseDates(a.releaseDate, b.releaseDate));
  }
}

export function parseLikedSongSort(value: string | null): LikedSongSort {
  const validSorts: LikedSongSort[] = [
    'name-asc',
    'name-desc',
    'liked-new',
    'liked-old',
    'release-new',
    'release-old',
  ];

  if (value && validSorts.includes(value as LikedSongSort)) {
    return value as LikedSongSort;
  }

  return 'liked-new';
}
