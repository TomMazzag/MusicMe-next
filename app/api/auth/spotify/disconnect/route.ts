import { NextResponse } from 'next/server';

const SPOTIFY_COOKIES = ['access_token', 'refresh_token', 'spotify_expires_at', 'session_exists'];

export async function POST() {
  const response = NextResponse.json({ success: true });

  SPOTIFY_COOKIES.forEach((cookieName) => {
    response.cookies.delete(cookieName);
  });

  return response;
}
