import { authenticatedRequest } from '@MusicMe/lib/backend';
import { BACKEND_URL_SERVER } from '@MusicMe/lib/util';
import { NextRequest, NextResponse } from 'next/server';

export async function PATCH(req: NextRequest): Promise<NextResponse> {
  const { genres } = await req.json();

  if (!genres || !Array.isArray(genres) || genres.length === 0) {
    return NextResponse.json({ error: 'Missing genres in request body' }, { status: 400 });
  }

  const response = await authenticatedRequest(`${BACKEND_URL_SERVER}/user/favourite-genres`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ genres }),
  });

  const data = await response.json();

  return NextResponse.json(data, { status: response.status });
}
