import { BACKEND_URL_SERVER } from '@MusicMe/lib/util';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest): Promise<NextResponse> {
  const searchParams = req.nextUrl.searchParams;
  const username = searchParams.get('username');

  if (!username) {
    return NextResponse.json({ message: 'Missing username' }, { status: 400 });
  }

  const searchRequest = await fetch(`${BACKEND_URL_SERVER}/user/search?name=${username}`, {
    method: 'GET',
    headers: { cookie: req.headers.get('cookie') || '', credentials: 'include' },
  });
  const data = await searchRequest.json();

  return NextResponse.json(data, { status: 200 });
}
