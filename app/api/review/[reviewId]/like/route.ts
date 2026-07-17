import { authenticatedRequest } from '@MusicMe/lib/backend';
import { BACKEND_URL_SERVER } from '@MusicMe/lib/util';
import { NextRequest, NextResponse } from 'next/server';

interface Params {
  params: Promise<{ reviewId: string }>;
}

export async function POST(_req: NextRequest, { params }: Params): Promise<NextResponse> {
  const { reviewId } = await params;

  if (!reviewId) {
    return NextResponse.json({ error: 'Missing reviewId in query parameters' }, { status: 400 });
  }

  const response = await authenticatedRequest(`${BACKEND_URL_SERVER}/like/review/${reviewId}/toggle`, {method: 'POST'});

  const data = await response.json();

  return NextResponse.json(data, { status: response.status });
}
