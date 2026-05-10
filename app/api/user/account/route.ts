import { BACKEND_URL_SERVER } from '@MusicMe/lib/util';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest): Promise<NextResponse> {
  const res = await fetch(`${BACKEND_URL_SERVER}/user/account`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      cookie: req.headers.get('cookie') || '',
    },
  });

  if (!res.ok) {
    console.log('Failed to fetch account details', { status: res.status, statusText: res.statusText });
    throw new Error('Failed to fetch account details', { cause: res });
  }

  const data = await res.json();
  const response = NextResponse.json(data, { status: res.status });

  return response
};
