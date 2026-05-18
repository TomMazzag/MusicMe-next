import { BACKEND_URL_SERVER } from '@MusicMe/lib/util';
import { NextRequest, NextResponse } from 'next/server';

interface Params {
  params: Promise<{ songId: string }>;
}

export async function POST(req: NextRequest, { params }: Params): Promise<NextResponse> {
  const { songId } = await params;

  if (!songId) {
    return NextResponse.json({ error: 'Missing songId in query parameters' }, { status: 400 });
  }

  const requestOptions = {
    method: 'POST',
    headers: {
      credentials: 'include',
      'Content-Type': 'application/json',
      cookie: req.headers.get('cookie') || '',
    },
  };

  const response = await fetch(`${BACKEND_URL_SERVER}/like/song/${songId}/toggle`, requestOptions);

  let data = await response.json();

  return NextResponse.json(data, { status: response.status });
}
