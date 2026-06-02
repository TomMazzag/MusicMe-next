import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest): Promise<NextResponse> {
  const searchParams = req.nextUrl.searchParams;
  const query = searchParams.get('query');

  if (!query) {
    return NextResponse.json({ message: 'Missing query' }, { status: 400 });
  }

  const cookieStore = await cookies();
  const spotifyToken = cookieStore.get('access_token')?.value;

  if (!spotifyToken) {
    return NextResponse.json({ message: 'Spotify token missing' }, { status: 403 });
  }

  const url = `https://api.spotify.com/v1/search?q=${query}&type=artist`;
  let encodedURI = encodeURI(url);

  const searchRequest = await fetch(encodedURI, {
    method: 'get',
    headers: { Authorization: `Bearer ${spotifyToken}` },
  });
  const data = await searchRequest.json();
  console.log('Spotify search result:', data);
  const result = data.artists;

  return NextResponse.json(result, { status: 200 });
}
