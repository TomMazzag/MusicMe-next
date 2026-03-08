import { Profile } from '@MusicMe/types/Profile';
import { BACKEND_URL_SERVER } from './util';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export const getAccountDetailsUsersAccount = async (): Promise<Profile.User> => {
  const cookieStore = await cookies();
  const response = await fetch(`${BACKEND_URL_SERVER}/user/account`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      cookie: cookieStore.toString(),
    },
  });

  if (!response.ok) {
    if (response.status === 401) {
      redirect('/');
    }
    throw new Error('Failed to fetch account details', { cause: response });
  }

  let data = await response.json();
  return data.userDetails;
};
