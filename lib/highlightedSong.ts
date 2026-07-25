import { HighlightedSong } from '@MusicMe/types/Profile';

export const updateHighlightedSong = async (songId: string): Promise<HighlightedSong> => {
  const response = await fetch('/api/user/highlighted-song', {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ songId }),
  });

  if (!response.ok) {
    throw new Error('Failed to update highlighted song');
  }

  const data = await response.json();
  return data.highlightedSong;
};
