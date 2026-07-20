import { authenticatedRequest } from '@MusicMe/lib/backend';
import { BACKEND_URL_SERVER } from '@MusicMe/lib/util';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('user_id');

  const response = await authenticatedRequest(`${BACKEND_URL_SERVER}/user/songs/liked${userId ? `?user_id=${userId}` : ''}`, {
    method: 'GET',
  });
  const data = await response.json();

  return NextResponse.json(data, { status: response.status });
}
