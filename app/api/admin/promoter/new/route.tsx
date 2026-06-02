import { BACKEND_URL_SERVER } from '@MusicMe/lib/util';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest): Promise<NextResponse> {
  const body = await req.json();
  const res = await fetch(`${BACKEND_URL_SERVER}/admin/content/new/promoter`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      cookie: req.headers.get('cookie') || '',
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const body = await res.json()
    if (body.error === 'ZodError') {
      console.log('Zod error: ', body.error.message)
      return NextResponse.json({ message: 'Failed to create new promoter, validator error', errors: body.errors }, { status: res.status });
    }
    return NextResponse.json({ message: 'Failed to create new promoter, unknown error' }, { status: res.status });
  }

  return NextResponse.json({ status: res.status });
}
