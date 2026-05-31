import { Profile } from './Profile';

export interface Review {
  id: number;
  username: string;
  profilePictureUrl: string;
  fullName: string;
  userId: Profile.Public['userId'];
  comment: string;
  rating: number;
  userHasLiked: boolean;
  likes: number;
}

export interface TrendingReview extends SpotifyApi.TrackObjectFull {
  username: string;
  profilePictureUrl: string;
  comment: string;
}
