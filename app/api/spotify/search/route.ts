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

  const url = `https://api.spotify.com/v1/search?q=${query}&type=${category.toLowerCase()}`;
  let encodedURI = encodeURI(url);

  const searchRequest = await fetch(encodedURI, {
    method: 'get',
    headers: { Authorization: `Bearer ${spotifyToken}` },
  });
  const data = await searchRequest.json();

  return NextResponse.json(data, { status: 200 });
}
