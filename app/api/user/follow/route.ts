import { BACKEND_URL_SERVER } from '@MusicMe/lib/util';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest): Promise<NextResponse> {
  const { follow_id } = await req.json();

  if (!follow_id) {
    return NextResponse.json({ error: 'Missing follow_id in request body' }, { status: 400 });
  }

  const requestOptions = {
    method: 'POST',
    headers: {
      credentials: 'include',
      'Content-Type': 'application/json',
      cookie: req.headers.get('cookie') || '',
    },
    body: JSON.stringify({ follow_id }),
  };

  const response = await fetch(`${BACKEND_URL_SERVER}/user/follow`, requestOptions);

  let data = await response.json();

  return NextResponse.json(data, { status: response.status });
}
