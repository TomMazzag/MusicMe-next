import { authenticatedRequest } from "@MusicMe/lib/backend";
import { BACKEND_URL_SERVER } from "@MusicMe/lib/util";
import { NextResponse } from "next/server";

export async function GET() {
  const user = await authenticatedRequest(`${BACKEND_URL_SERVER}/user/current/id`, { method: 'GET' });
  if (!user.ok) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }
  const data = await user.json();
  return NextResponse.json({ userId: data.userId });
}