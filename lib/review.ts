import { UserReview } from '@MusicMe/types/Review';
import { authenticatedRequest } from './backend';
import { BACKEND_URL_SERVER } from './util';

export interface UserReviewsResponse {
  user: { fullName: string };
  reviews: UserReview[];
}

export const getUserReviews = async (userId: string): Promise<UserReviewsResponse> => {
  const response = await authenticatedRequest(`${BACKEND_URL_SERVER}/user/${userId}/reviews`, { method: 'GET' });

  if (!response.ok) {
    console.log('Failed to fetch user reviews', { status: response.status, statusText: response.statusText });
    throw new Error('Failed to fetch user reviews', { cause: response });
  }

  return response.json();
};
