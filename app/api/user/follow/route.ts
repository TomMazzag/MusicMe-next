import { authenticatedRequest } from '@MusicMe/lib/backend';
import { BACKEND_URL_SERVER } from '@MusicMe/lib/util';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest): Promise<NextResponse> {
  const { followUserId } = await req.json();

  if (!followUserId) {
    return NextResponse.json({ error: 'Missing followUserId in request body' }, { status: 400 });
  }

  console.log(followUserId);
  const response = await authenticatedRequest(`${BACKEND_URL_SERVER}/user/follow`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ followUserId }),
  });

  const data = await response.json();

  return NextResponse.json(data, { status: response.status });
}
