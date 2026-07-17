import { MusicBrainz } from '@MusicMe/types/MusicBrainz';
import { BACKEND_URL_SERVER } from './util';
import { SongV2 } from '@MusicMe/types/Song';

export function convertMusicBrainzRecordingData(data: MusicBrainz.RecordingResponse) {
  return data.recordings.map((recording) => ({
    album: {
      images: [{ url: 'https://upload.wikimedia.org/wikipedia/commons/c/c1/LP_Vinyl_Symbol_Icon.png' }],
    },
    name: recording.title,
    artists: [{ name: recording['artist-credit'][0].name }],
    id: recording.id,
    score: recording.score
  }));
}

export const MUSIC_BRAINZ_SOURCE = 'mbz';

export const getSongMB = async (songId: string): Promise<SongV2> => {
  const response = await fetch(`${BACKEND_URL_SERVER}/song/${songId}/${MUSIC_BRAINZ_SOURCE}`, {
    method: 'GET',
  });

  const data = await response.json();

  return data;
};