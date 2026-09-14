import { MusicBrainz } from '@MusicMe/types/MusicBrainz';

export function convertMusicBrainzRecordingData(data: MusicBrainz.ReleaseResponse) {
  return data.releases.map((release) => ({
    album: {
      release_date: formatReleaseDate(release.date),
      images: [{ url: '' }],
    },
    name: release.title,
    artists: [{ name: release['artist-credit'][0].name, id: release['artist-credit'][0].artist.id }],
    id: release.id,
    score: release.score,
  }));
}

function formatReleaseDate(date: string) {
  if (!date) {
    return null;
  }
  if (date.length === 4) {
    return `${date}-01-01`;
  } else if (date.length === 7) {
    return `${date}-01`;
  } else if (date.length === 10) {
    return date;
  } else {
    return null;
  }
}

export const MUSIC_BRAINZ_SOURCE = 'mbz';