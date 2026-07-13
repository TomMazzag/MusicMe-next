import { authenticatedRequest } from '@MusicMe/lib/backend';
import { BACKEND_URL_SERVER } from '@MusicMe/lib/util';
import { NextResponse } from 'next/server';

export async function GET(): Promise<NextResponse> {
  const response = await authenticatedRequest(`${BACKEND_URL_SERVER}/user/songs/liked`, {
    method: 'GET',
  });
  const data = await response.json();

  return NextResponse.json(data, { status: response.status });
}
