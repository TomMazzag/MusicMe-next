import { authenticatedRequest } from '@MusicMe/lib/backend';
import { BACKEND_URL_SERVER } from '@MusicMe/lib/util';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest): Promise<NextResponse> {
  const body = await req.json();

  const response = await authenticatedRequest(`${BACKEND_URL_SERVER}/song/musicbrainz/import`, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();

  if (!response.ok) {
    return NextResponse.json({ error: 'Failed to import song', data }, { status: response.status });
  }

  console.log('DATA: ', data);

  return NextResponse.json(data, { status: response.status });
}
