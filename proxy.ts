import { NextRequest, NextResponse } from 'next/server';
import { BACKEND_URL_SERVER } from './lib/util';
import { clerkMiddleware } from '@clerk/nextjs/server';

// const PROTECTED_PATHS = ['/account'];
const SPOTIFY_EXPIRES_COOKIE_NAME = 'spotify_expires_at';

const ADMIN_PATHS = ['/admn'];

export default clerkMiddleware(async (_auth, req) => {
  const { pathname } = req.nextUrl;
  if (ADMIN_PATHS.some((path) => pathname.startsWith(path))) {
    try {
      const isAdmin = await checkIsAdmin(req);
      const isSpotifyTokenExpired = checkIsSpotifyTokenExpired(req);
      if (isSpotifyTokenExpired) {
        const refreshedCookies = await refreshToken(req);
        const response = NextResponse.redirect(new URL(req.url));
        refreshedCookies.forEach((cookie) => {
          response.headers.append('set-cookie', cookie);
        });
        return response;
      }
      if (!isAdmin) {
        const homepage = new URL('/', req.url);
        return NextResponse.redirect(homepage);
      }
    } catch (error) {
      console.error(error);
      const homepage = new URL('/', req.url);
      return NextResponse.redirect(homepage);
    }
  }
});

function checkIsSpotifyTokenExpired(req: NextRequest) {
  const spotifyTokenExpiry = req.cookies.get(SPOTIFY_EXPIRES_COOKIE_NAME)?.value;
  if (!spotifyTokenExpiry) {
    return false;
  }
  const expiryTime = parseInt(spotifyTokenExpiry, 10);
  const currentTime = Date.now();
  return currentTime >= expiryTime;
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

async function checkIsAdmin(req: NextRequest) {
  const cookie = req.headers.get('cookie') || '';

  const res = await fetch(`${BACKEND_URL_SERVER}/user/check_admin`, {
    method: 'GET',
    headers: {
      cookie,
    },
  });

  if (!res.ok) {
    throw new Error('Failed to check admin status', { cause: res });
  }

  const data = await res.json();
  return data.isAdmin;
}

// export default async function proxy(req: NextRequest) {
//   if (isProtectedPath) {
//     const accessToken = req.cookies.get('access_token')?.value;
//     if (!accessToken) {
//       const loginUrl = new URL('/', req.url);
//       return NextResponse.redirect(loginUrl);
//     }
//   }

//   return NextResponse.next();
// }
