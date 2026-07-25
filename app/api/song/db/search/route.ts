import { BACKEND_URL_SERVER } from '@MusicMe/lib/util';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest): Promise<NextResponse> {
  const searchParams = req.nextUrl.searchParams;
  const query = searchParams.get('query');

  if (!query) {
    return NextResponse.json({ message: 'Missing query' }, { status: 400 });
  }

  const searchRequest = await fetch(`${BACKEND_URL_SERVER}/song/search?query=${encodeURIComponent(query)}`, {
    method: 'GET',
    headers: { cookie: req.headers.get('cookie') || '', credentials: 'include' },
  });
  const data = await searchRequest.json();

  return NextResponse.json(data, { status: searchRequest.status });
}
