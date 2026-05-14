import { NextResponse } from 'next/server';

const COOKIE_NAMES_TO_DELETE = [
  'access_token',
  'refresh_token',
  'platform_token',
  'spotify_expires_at',
  'session_exists',
];

export async function POST() {
  const response = NextResponse.json({ success: true });

  COOKIE_NAMES_TO_DELETE.forEach((cookieName) => {
    response.cookies.delete(cookieName);
  });

  return response;
}