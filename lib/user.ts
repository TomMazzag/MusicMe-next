import { Profile } from '@MusicMe/types/Profile';
import { BACKEND_URL_SERVER } from './util';
import { authenticatedRequest } from './backend';

export const getAccountDetailsUsersAccount = async (): Promise<Profile.User> => {
  const response = await authenticatedRequest(`${BACKEND_URL_SERVER}/user/account`, { method: 'GET' });

  if (!response.ok) {
    console.log('Failed to fetch account details', { status: response.status, statusText: response.statusText });
    throw new Error('Failed to fetch account details', { cause: response });
  }

  const data = await response.json();
  return data.userDetails;
};