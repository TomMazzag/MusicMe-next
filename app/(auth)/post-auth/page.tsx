import { auth } from '@clerk/nextjs/server';
import { BACKEND_URL_SERVER } from '@MusicMe/lib/util';
import { redirect } from 'next/navigation';

export default async function PostAuth() {
  const { userId } = await auth();
  if (!userId) redirect('/sign-in');

  const existingUser = await fetch(`${BACKEND_URL_SERVER}/user/check_exists/${userId}`, { method: 'GET' });
  const data = await existingUser.json();
  console.log('!!! existingUser', existingUser.status, data);

  if (existingUser.status === 404) {
    redirect('/create-account');
  } else {
    redirect('/account');
  }
}
