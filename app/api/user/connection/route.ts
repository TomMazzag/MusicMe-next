import { authenticatedRequest } from '@MusicMe/lib/backend';
import { BACKEND_URL_SERVER } from '@MusicMe/lib/util';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest): Promise<NextResponse> {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('userId');
  const type = searchParams.get('type');

  if (!userId || !type || (type !== 'followers' && type !== 'following')) {
    return NextResponse.json({ error: 'Missing or invalid userId or type parameter' }, { status: 400 });
  }

  const response = await authenticatedRequest(`${BACKEND_URL_SERVER}/user/${userId}/${type}`, {
    method: 'GET',
  });

  const data = await response.json();

  return NextResponse.json(data, { status: response.status });
}
