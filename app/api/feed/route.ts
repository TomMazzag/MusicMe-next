import { BACKEND_URL_SERVER } from '@MusicMe/lib/util';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const page = searchParams.get('page') ?? '1';
  const limit = searchParams.get('limit') ?? '10';

  const params = new URLSearchParams({ page, limit });
  const response = await fetch(`${BACKEND_URL_SERVER}/feed?${params.toString()}`);
  const data = await response.json();

  return NextResponse.json(data, { status: response.status });
}
