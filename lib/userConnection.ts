import { Profile } from '@MusicMe/types/Profile';
import { BACKEND_URL } from './util';

/** Client side
 * @returns a list of followers for the given user
 */
export const getFollowers = async (userId: string) => {
  const response = await fetch(`${BACKEND_URL}/user/${userId}/followers`, { method: 'GET', credentials: 'include' });

  let data = await response.json();
  return data;
};

/** Client side
 * @returns a list of following for the given user
 */
export const getFollowing = async (userId: string) => {
  const response = await fetch(`${BACKEND_URL}/user/${userId}/following`, { method: 'GET', credentials: 'include' });

  let data = await response.json();
  return data;
};

/** Client side
 * Follows or unfollows a user based on whether the current user is already following them.
 * The backend will determine the action to take based on the current follow status of the target user.
 */
export const followOrUnfollowUser = async (follow_id: Profile.Public['user_id']) => {
  const requestOptions = {
    method: 'POST',
    headers: {
      credentials: 'include',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ follow_id: follow_id }),
  };

  const response = await fetch(`${BACKEND_URL}/user/follow`, requestOptions);

  let data = await response.json();
  return data;
};
