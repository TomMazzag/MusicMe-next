import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

export default async function PostAuth() {
  const user = await currentUser();

  if (!user) redirect('/');

  const existingUser = user.publicMetadata?.onboardingComplete === 'true';

  if (existingUser) {
    redirect('/account');
  } else {
    redirect('/create-account');
  }
}
