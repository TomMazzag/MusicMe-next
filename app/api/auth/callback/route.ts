import { BACKEND_URL_SERVER } from '@MusicMe/lib/util';
import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';

const SESSION_EXISTS = 'session_exists=true; Path=/; Max-Age=2592000; SameSite=Lax';

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

  if (data?.user?.userFound === false || res.status === 404) {
    const createAccountResponse = NextResponse.json({ redirectPath: '/create-account' }, { status: 308 });
    const cookies = res.headers.getSetCookie();
    cookies.forEach((cookie) => {
      createAccountResponse.headers.append('set-cookie', cookie);
    });

    return createAccountResponse;
  }

  const response = NextResponse.json(data, { status: res.status });

  const cookies = res.headers.getSetCookie();
  cookies.forEach((cookie) => {
    response.headers.append('set-cookie', cookie);
  });

  response.headers.append('set-cookie', SESSION_EXISTS);

  return response;
}
