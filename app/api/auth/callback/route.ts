import { BACKEND_URL_SERVER } from '@MusicMe/lib/util';
import { auth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';

const SESSION_EXISTS = 'session_exists=true; Path=/; Max-Age=2592000; SameSite=Lax';

export async function GET(req: NextRequest) {
  const { getToken } = await auth();
  const token = await getToken();

  const url = new URL(`${BACKEND_URL_SERVER}/auth/callback`);
  url.search = req.url.split('?')[1] || '';

  const headers: HeadersInit = {
    cookie: req.headers.get('cookie') || '',
  };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(url.toString(), {
    method: 'GET',
    headers,
  });
  const data = await res.json();
  const response = NextResponse.json(data, { status: res.status });

  const cookies = res.headers.getSetCookie();
  cookies.forEach((cookie) => {
    response.headers.append('set-cookie', cookie);
  });

  response.headers.append('set-cookie', SESSION_EXISTS);

  return response;
}
