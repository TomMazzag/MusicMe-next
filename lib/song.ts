import { SongData } from '@MusicMe/types/Song';
import { BACKEND_URL_SERVER } from "./util";

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
