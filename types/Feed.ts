export interface FeedItem {
  id: string;
  name: string;
  imageUrl: string | null;
  releaseDate: string | null;
  artist: string;
  viewsToday: number;
  likes: number;
  reviewCount: number;
}

export interface FeedPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasMore: boolean;
}

export interface FeedResponse {
  items: FeedItem[];
  pagination: FeedPagination;
}

export interface PageParam {
  page?: number;
  limit?: number;
}
