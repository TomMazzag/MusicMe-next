import { BACKEND_URL_SERVER } from '@MusicMe/lib/util';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest): Promise<NextResponse> {
  const body = await req.json();
  const res = await fetch(`${BACKEND_URL_SERVER}/admin/content/new/artist`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      cookie: req.headers.get('cookie') || '',
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    console.log('Failed to create new artist', { status: res.status, statusText: res.statusText });
    throw new Error('Failed to create new artist', { cause: res });
  }

  return NextResponse.json({ status: res.status });
}
