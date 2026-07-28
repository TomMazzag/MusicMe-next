import { authenticatedRequest } from '@MusicMe/lib/backend';
import { BACKEND_URL_SERVER } from '@MusicMe/lib/util';
import { NextRequest, NextResponse } from 'next/server';

interface Params {
  params: Promise<{ songId: string }>;
}

export async function POST(req: NextRequest, { params }: Params): Promise<NextResponse> {
  const { songId } = await params;
  const { comment, rating } = await req.json();

  if (!songId) {
    return NextResponse.json({ error: 'Missing songId in query parameters' }, { status: 400 });
  }

  if (!rating || rating < 1 || rating > 5) {
    return NextResponse.json({ error: 'Rating must be between 1 and 5' }, { status: 400 });
  }

  if (!comment?.trim()) {
    return NextResponse.json({ error: 'Comment is required' }, { status: 400 });
  }

  const response = await authenticatedRequest(`${BACKEND_URL_SERVER}/review/song/${songId}/new`, {
    method: 'POST',
    body: JSON.stringify({ comment: comment.trim(), rating }),
    headers: { 'Content-Type': 'application/json' },
  });

  const data = await response.json();

  return NextResponse.json(data, { status: response.status });
}
