import { BACKEND_URL_SERVER } from '@MusicMe/lib/util';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest): Promise<NextResponse> {
  const response = await fetch(`${BACKEND_URL_SERVER}/user/songs/liked`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      cookie: req.headers.get('cookie') || '',
    },
  });
  const data = await response.json();

  return NextResponse.json(data, { status: response.status });
}
