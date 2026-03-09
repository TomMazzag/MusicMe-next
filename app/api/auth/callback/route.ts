import { BACKEND_URL_SERVER } from '@MusicMe/lib/util';
import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function GET(req: NextRequest) {
  const url = new URL(`${BACKEND_URL_SERVER}/auth/callback`);
  url.search = req.url.split('?')[1] || '';

  const res = await fetch(url.toString(), {
    method: 'GET',
    headers: {
      cookie: req.headers.get('cookie') || '',
    },
  });
  const data = await res.json();

  const response = NextResponse.json(data, { status: res.status });

  const cookies = res.headers.getSetCookie();
  cookies.forEach((cookie) => {
    response.headers.append('set-cookie', cookie);
  });

  return response;
}
