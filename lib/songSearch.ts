import { SongData } from '@MusicMe/types/Song';

export const DEFAULT_TRACK_IMAGE =
  'https://upload.wikimedia.org/wikipedia/commons/c/c1/LP_Vinyl_Symbol_Icon.png';

export type SearchTrackSource = 'db' | 'mbz' | 'spotify';

export interface SearchTrackItem {
  id: string;
  name: string;
  artists: { id: string; name: string }[];
  album: {
    images: { url: string }[];
    release_date?: string | null;
  };
  external_urls?: { spotify?: string };
  source: SearchTrackSource;
}

export function getTrackDedupeKey(name: string, artistName: string): string {
  return `${name.toLowerCase().trim()}::${artistName.toLowerCase().trim()}`;
}

export function buildDbDedupeKeys(dbSongs: SongData[]): Set<string> {
  const keys = new Set<string>();

  for (const song of dbSongs) {
    const primaryArtist = song.artists[0]?.name ?? '';
    keys.add(getTrackDedupeKey(song.name, primaryArtist));

    const allArtists = song.artists.map((artist) => artist.name).join(', ');
    if (allArtists !== primaryArtist) {
      keys.add(getTrackDedupeKey(song.name, allArtists));
    }
  }

  return keys;
}

export function dedupeExternalTracks(tracks: SearchTrackItem[], dbSongs: SongData[]): SearchTrackItem[] {
  const dbKeys = buildDbDedupeKeys(dbSongs);

  return tracks.filter((track) => {
    const artistName = track.artists[0]?.name ?? '';
    return !dbKeys.has(getTrackDedupeKey(track.name, artistName));
  });
}

export function mapDbSongToSearchTrack(song: SongData): SearchTrackItem {
  return {
    id: song.id,
    name: song.name,
    artists: song.artists.map((artist) => ({ id: artist.id, name: artist.name })),
    album: {
      images: [{ url: song.imageUrl ?? DEFAULT_TRACK_IMAGE }],
      release_date: song.releaseDate ?? null,
    },
    source: 'db',
  };
}

type MbzTrackShape = {
  id: string;
  name: string;
  artists: { id: string; name: string }[];
  album: {
    images: { url: string }[];
    release_date?: string | null;
  };
};

export function mapMbzTrackToSearchTrack(track: MbzTrackShape): SearchTrackItem {
  return {
    ...track,
    source: 'mbz',
  };
}

export function mapSpotifyTrackToSearchTrack(track: SpotifyApi.TrackObjectFull): SearchTrackItem {
  return {
    id: track.id,
    name: track.name,
    artists: track.artists.map((artist) => ({ id: artist.id, name: artist.name })),
    album: {
      images: track.album.images.length > 0 ? track.album.images : [{ url: DEFAULT_TRACK_IMAGE }],
      release_date: track.album.release_date ?? null,
    },
    external_urls: track.external_urls,
    source: 'spotify',
  };
}
