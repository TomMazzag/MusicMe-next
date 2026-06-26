import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest): Promise<NextResponse> {
  const searchParams = req.nextUrl.searchParams;
  const query = searchParams.get('query');
  const type = searchParams.get('type');

  if (!query) {
    return NextResponse.json({ message: 'Missing query' }, { status: 400 });
  }
  if (!type) {
    return NextResponse.json({ message: 'Missing type' }, { status: 400 });
  }

  const cookieStore = await cookies();
  const spotifyToken = cookieStore.get('access_token')?.value;

  if (!spotifyToken) {
    return NextResponse.json({ message: 'Spotify token missing' }, { status: 403 });
  }

  const url = `https://api.spotify.com/v1/search?q=${query}&type=${type}`;
  let encodedURI = encodeURI(url);

  const searchRequest = await fetch(encodedURI, {
    method: 'get',
    headers: { Authorization: `Bearer ${spotifyToken}` },
  });
  const data = await searchRequest.json();
  const result = data[type.toLowerCase() + 's'];

  return NextResponse.json(result, { status: 200 });
}
