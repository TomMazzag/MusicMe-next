import 'server-only';

import { Song } from '@MusicMe/types/Song';
import { BACKEND_URL_SERVER } from './util';
import { cookies } from 'next/headers';

export async function getSong(songId: string): Promise<Song | null> {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.getAll().map((c) => `${c.name}=${c.value}`).join('; ');

  const response = await fetch(`${BACKEND_URL_SERVER}/song/${songId}`, {
    method: 'GET',
    headers: cookieHeader ? { cookie: cookieHeader } : {},
    next: { revalidate: 3600 },
  });

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error(`Failed to fetch song, status code: ${response.status}`);
  }

  return response.json();
}
