import { BACKEND_URL_SERVER } from '@MusicMe/lib/util';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest): Promise<NextResponse> {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('userId');
  const type = searchParams.get('type');

  if (!userId || !type || (type !== 'followers' && type !== 'following')) {
    return NextResponse.json({ error: 'Missing or invalid userId or type parameter' }, { status: 400 });
  }

  const response = await fetch(`${BACKEND_URL_SERVER}/user/${userId}/${type}`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      cookie: req.headers.get('cookie') || '',
    },
  });

  let data = await response.json();

  return NextResponse.json(data, { status: response.status });
}
