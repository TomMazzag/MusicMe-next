import { convertMusicBrainzRecordingData, MUSIC_BRAINZ_SOURCE } from '@MusicMe/lib/musicBrainz';
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
      return NextResponse.json({ message: 'Error searching for songs' }, { status: 503 });
    }
    const data = (await musicBrainzReq.json()) as MusicBrainz.ReleaseResponse;
    const mappedData = convertMusicBrainzRecordingData(data);
    return NextResponse.json({ items: mappedData, source: MUSIC_BRAINZ_SOURCE }, { status: 200 });
  }

  const url = `https://api.spotify.com/v1/search?q=${query}&type=${category.toLowerCase()}`;
  const encodedURI = encodeURI(url);

  const searchRequest = await fetch(encodedURI, {
    method: 'get',
    headers: { Authorization: `Bearer ${spotifyToken}` },
  });
  const data = await searchRequest.json();
  const transformedCategory = category.toLowerCase() + 's';
  const result = data[transformedCategory];

  return NextResponse.json(result, { status: 200 });
}
