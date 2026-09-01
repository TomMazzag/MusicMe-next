import { convertMusicBrainzRecordingData, MUSIC_BRAINZ_SOURCE } from '@MusicMe/lib/musicBrainz';
import {
  dedupeAgainstTracks,
  mapMbzTrackToSearchTrack,
  mapSpotifyTrackToSearchTrack,
  SearchTrackItem,
} from '@MusicMe/lib/songSearch';
import { MUSIC_BRAINZ_UA } from '@MusicMe/lib/util';
import { MusicBrainz } from '@MusicMe/types/MusicBrainz';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest): Promise<NextResponse> {
  const searchParams = req.nextUrl.searchParams;
  const query = searchParams.get('query');
  const category = searchParams.get('category');

  if (!category || !query) {
    return NextResponse.json({ message: 'Missing category or query' }, { status: 400 });
  }

  const cookieStore = await cookies();
  const spotifyToken = cookieStore.get('access_token')?.value;

  const url = `https://musicbrainz.org/ws/2/release/?query=release:${query}&fmt=json`;
  const musicBrainzReq = await fetch(url, {
    method: 'GET',
    headers: {
      'User-Agent': MUSIC_BRAINZ_UA,
      Accept: 'application/json',
    },
  });

  let mbzTracks: SearchTrackItem[] = [];
  if (musicBrainzReq.ok) {
    const data = (await musicBrainzReq.json()) as MusicBrainz.ReleaseResponse;
    const mappedData = convertMusicBrainzRecordingData(data);
    mbzTracks = mappedData.map(mapMbzTrackToSearchTrack);
  }

  if (spotifyToken) {
    const spotifyUrl = `https://api.spotify.com/v1/search?q=${query}&type=${category.toLowerCase()}`;
    const searchRequest = await fetch(encodeURI(spotifyUrl), {
      method: 'get',
      headers: { Authorization: `Bearer ${spotifyToken}` },
    });
    const data = await searchRequest.json();
    const transformedCategory = category.toLowerCase() + 's';
    const spotifyResults = data[transformedCategory]?.items ?? [];
    const spotifyTracks = spotifyResults.map(mapSpotifyTrackToSearchTrack);
    const filteredSpotifyTracks = dedupeAgainstTracks(spotifyTracks, mbzTracks);

    const items = [...mbzTracks, ...filteredSpotifyTracks];
    if (items.length > 0) {
      return NextResponse.json({ items }, { status: 200 });
    }
  }

  if (mbzTracks.length > 0) {
    return NextResponse.json({ items: mbzTracks, source: MUSIC_BRAINZ_SOURCE }, { status: 200 });
  }

  return NextResponse.json({ message: 'Error searching for songs' }, { status: 503 });
}
