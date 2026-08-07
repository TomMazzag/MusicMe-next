import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest): Promise<NextResponse> {
  const access_token = req.cookies.get('access_token')?.value;

  if (!access_token) {
    console.log('No access token found in cookies');
    return NextResponse.json({ success: false, message: 'No access token found' }, { status: 401 });
  }

  const result = await fetch('https://api.spotify.com/v1/me', {
    method: 'GET',
    headers: { Authorization: `Bearer ${access_token}` },
  });
  const data = await result.json();

  if (!result.ok) {
    console.log('Failed to fetch Spotify profile', { status: result.status, statusText: result.statusText, data });
    return NextResponse.json({ success: false, message: 'Failed to fetch Spotify profile' }, { status: result.status });
  }

  return NextResponse.json(data, { status: result.status });
}
