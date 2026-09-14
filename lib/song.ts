import { Song, SongData } from '@MusicMe/types/Song';
import { BACKEND_URL_SERVER } from './util';
import type { Metadata } from 'next';

export function buildSongMetadata(songResponse: Song, songId: string): Metadata {
  const { songData, reviewCount, likes } = songResponse;
  const artistNames = songData.artists.map((artist) => artist.name).join(', ');
  const title = `${songData.name} by ${artistNames}`;
  const description = `Listen to ${songData.name} by ${artistNames} on Zenekio. ${reviewCount} reviews, ${likes} likes.`;

  return {
    title,
    description,
    alternates: {
      canonical: `/song/${songId}`,
    },
    openGraph: {
      title,
      description,
      url: `/song/${songId}`,
      type: 'website',
      ...(songData.imageUrl && {
        images: [{ url: songData.imageUrl, width: 640, height: 640, alt: `${songData.name} cover art` }],
      }),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      ...(songData.imageUrl && { images: [songData.imageUrl] }),
    },
  };
}

export async function searchSongs(query: string): Promise<SongData[]> {
  const response = await fetch(`/api/song/db/search?query=${encodeURIComponent(query)}`);

  if (!response.ok) {
    throw new Error('Failed to search songs');
  }

  const data = await response.json();
  return data.results ?? [];
}

export async function addSongView(songId: string) {
  const response = await fetch(`${BACKEND_URL_SERVER}/song/${songId}/view`, {
    method: 'POST',
    credentials: 'include',
  });

    if (!response.ok) {
        console.log('Failed to add song view', { status: response.status, statusText: response.statusText });
    }
}
