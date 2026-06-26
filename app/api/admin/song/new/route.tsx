import { BACKEND_URL_SERVER } from '@MusicMe/lib/util';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest): Promise<NextResponse> {
  const body = await req.json();
  const res = await fetch(`${BACKEND_URL_SERVER}/admin/content/new/song`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      cookie: req.headers.get('cookie') || '',
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const body = await res.json();
    if (body.error === 'ZodError') {
      console.log('Zod error: ', body.errors);
      return NextResponse.json(
        { message: 'Failed to create new song, validator error', errors: body.errors },
        { status: res.status },
      );
    }
    return NextResponse.json({ message: 'Failed to create new song, unknown error' }, { status: res.status });
  }

  return NextResponse.json({ status: res.status });
}
