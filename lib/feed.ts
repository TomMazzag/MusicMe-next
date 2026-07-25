import { FeedResponse } from '@MusicMe/types/Feed';

export async function getFeed(page = 1, limit = 10): Promise<FeedResponse> {
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  });

  const response = await fetch(`/api/feed?${params.toString()}`);

  if (!response.ok) {
    throw new Error('Failed to fetch feed');
  }

  return response.json();
}
