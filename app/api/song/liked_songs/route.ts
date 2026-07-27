import { authenticatedRequest } from '@MusicMe/lib/backend';
import { BACKEND_URL_SERVER } from '@MusicMe/lib/util';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('user_id');
  const sort = searchParams.get('sort');

  const params = new URLSearchParams();
  if (userId) {
    params.set('user_id', userId);
  }
  if (sort) {
    params.set('sort', sort);
  }

  const queryString = params.toString();
  const url = `${BACKEND_URL_SERVER}/user/songs/liked${queryString ? `?${queryString}` : ''}`;

  const response = await authenticatedRequest(url, {
    method: 'GET',
  });
  const data = await response.json();

  return NextResponse.json(data, { status: response.status });
}
