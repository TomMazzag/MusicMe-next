import { authenticatedRequest } from '@MusicMe/lib/backend';
import { BACKEND_URL_SERVER } from '@MusicMe/lib/util';
import { NextResponse } from 'next/server';

export async function GET(): Promise<NextResponse> {
  const res = await authenticatedRequest(`${BACKEND_URL_SERVER}/user/account`, {
    method: 'GET',
  });

  if (!res.ok) {
    console.log('Failed to fetch account details', { status: res.status, statusText: res.statusText });
    throw new Error('Failed to fetch account details', { cause: res });
  }

  const data = await res.json();
  const response = NextResponse.json(data, { status: res.status });

  return response
};
