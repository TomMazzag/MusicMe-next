import { convertMusicBrainzRecordingData } from '@MusicMe/lib/musicBrainz';
import {
  dedupeExternalTracks,
  mapDbSongToSearchTrack,
  mapMbzTrackToSearchTrack,
  mapSpotifyTrackToSearchTrack,
} from '@MusicMe/lib/songSearch';
import { BACKEND_URL_SERVER, MUSIC_BRAINZ_UA } from '@MusicMe/lib/util';
import { MusicBrainz } from '@MusicMe/types/MusicBrainz';
import { SongData } from '@MusicMe/types/Song';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

async function fetchDbSongs(query: string, cookieHeader: string): Promise<SongData[]> {
  try {
    const response = await fetch(`${BACKEND_URL_SERVER}/song/search?query=${encodeURIComponent(query)}`, {
      headers: { cookie: cookieHeader },
    });

    if (!response.ok) {
      return [];
    }

    const data = await response.json();
    return data.results ?? [];
  } catch {
    return [];
  }
}

export async function GET(req: NextRequest): Promise<NextResponse> {
  const searchParams = req.nextUrl.searchParams;
  const query = searchParams.get('query');
  const category = searchParams.get('category');

  if (!category || !query) {
    return NextResponse.json({ message: 'Missing category or query' }, { status: 400 });
  }

  const cookieHeader = req.headers.get('cookie') || '';
  const dbSongs = await fetchDbSongs(query, cookieHeader);
  const dbTracks = dbSongs.map(mapDbSongToSearchTrack);

  const cookieStore = await cookies();
  const spotifyToken = cookieStore.get('access_token')?.value;

  if (!spotifyToken) {
    const url = `https://musicbrainz.org/ws/2/release/?query=release:${query}&fmt=json`;
    const musicBrainzReq = await fetch(url, {
      method: 'GET',
      headers: {
        'User-Agent': MUSIC_BRAINZ_UA,
        Accept: 'application/json',
      },
    });

    if (!musicBrainzReq.ok) {
      if (dbTracks.length > 0) {
        return NextResponse.json({ items: dbTracks }, { status: 200 });
      }

      return NextResponse.json({ message: 'Error searching for songs' }, { status: 503 });
    }

    const data = (await musicBrainzReq.json()) as MusicBrainz.ReleaseResponse;
    const mappedData = convertMusicBrainzRecordingData(data);
    const mbzTracks = mappedData.map(mapMbzTrackToSearchTrack);
    const filteredMbzTracks = dedupeExternalTracks(mbzTracks, dbSongs);

    return NextResponse.json({ items: [...dbTracks, ...filteredMbzTracks] }, { status: 200 });
  }

  const url = `https://api.spotify.com/v1/search?q=${query}&type=${category.toLowerCase()}`;
  const encodedURI = encodeURI(url);

  const searchRequest = await fetch(encodedURI, {
    method: 'get',
    headers: { Authorization: `Bearer ${spotifyToken}` },
  });
  const data = await searchRequest.json();
  const transformedCategory = category.toLowerCase() + 's';
  const spotifyResults = data[transformedCategory]?.items ?? [];
  const spotifyTracks = spotifyResults.map(mapSpotifyTrackToSearchTrack);
  const filteredSpotifyTracks = dedupeExternalTracks(spotifyTracks, dbSongs);

  return NextResponse.json({ items: [...dbTracks, ...filteredSpotifyTracks] }, { status: 200 });
}
