import { NextRequest, NextResponse } from 'next/server';
import { BACKEND_URL_SERVER } from './lib/util';

const PROTECTED_PATHS = ['/account'];
const SPOTIFY_ROUTES = ['/account'];

const SPOTIFY_EXPIRES_COOKIE_NAME = 'spotify_expires_at';

export default async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const isProtectedPath = PROTECTED_PATHS.some((path) => pathname.startsWith(path));
  const isSpotifyRoute = SPOTIFY_ROUTES.some((path) => pathname.startsWith(path));
  const spotifyTokenExpiry = req.cookies.get(SPOTIFY_EXPIRES_COOKIE_NAME)?.value;

  if (spotifyTokenExpiry && isSpotifyRoute) {
    const expiryTime = parseInt(spotifyTokenExpiry, 10);
    const currentTime = Date.now();
    if (currentTime >= expiryTime) {
      const refreshedCookies = await refreshToken(req);
      const response = NextResponse.redirect(new URL(req.url));
      refreshedCookies.forEach((cookie) => {
        response.headers.append('set-cookie', cookie);
      });
      return response;
    }
  }

  if (isProtectedPath) {
    const accessToken = req.cookies.get('access_token')?.value;
    if (!accessToken) {
      const loginUrl = new URL('/', req.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

async function refreshToken(req: NextRequest) {
  const cookie = req.headers.get('cookie') || '';

  const res = await fetch(`${BACKEND_URL_SERVER}/auth/refresh/spotify_token`, {
    method: 'POST',
    headers: {
      cookie,
    },
  });

  if (!res.ok) {
    throw new Error('Failed to refresh Spotify token', { cause: res });
  }

  const cookies = res.headers.getSetCookie();
  return cookies;
}
