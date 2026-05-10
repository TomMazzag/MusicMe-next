import { Profile } from '@MusicMe/types/Profile';
import { BACKEND_URL_SERVER } from './util';
import { cookies } from 'next/headers';

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
    console.log('Failed to fetch account details', { status: response.status, statusText: response.statusText });
    throw new Error('Failed to fetch account details', { cause: response });
  }

  let data = await response.json();
  return data.userDetails;
};