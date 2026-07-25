import { authenticatedRequest } from '@MusicMe/lib/backend';
import { BACKEND_URL_SERVER } from '@MusicMe/lib/util';
import { NextRequest, NextResponse } from 'next/server';

export async function PATCH(req: NextRequest): Promise<NextResponse> {
  const { songId } = await req.json();

  if (!songId) {
    return NextResponse.json({ error: 'Missing songId in request body' }, { status: 400 });
  }

  const response = await authenticatedRequest(`${BACKEND_URL_SERVER}/user/highlighted-song`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ songId }),
  });

  const data = await response.json();

  return NextResponse.json(data, { status: response.status });
}
