import { authenticatedRequest } from '@MusicMe/lib/backend';
import { BACKEND_URL_SERVER } from '@MusicMe/lib/util';
import { NextRequest, NextResponse } from 'next/server';

interface Params {
  params: Promise<{ songId: string }>;
}

export async function POST(req: NextRequest, { params }: Params): Promise<NextResponse> {
  const { songId } = await params;
  const { comment } = await req.json();

  if (!songId) {
    return NextResponse.json({ error: 'Missing songId in query parameters' }, { status: 400 });
  }

  const response = await authenticatedRequest(`${BACKEND_URL_SERVER}/review/song/${songId}/new`, {
    method: 'POST',
    body: JSON.stringify({ comment }),
    headers: { 'Content-Type': 'application/json' },
  });

  const data = await response.json();

  return NextResponse.json(data, { status: response.status });
}
