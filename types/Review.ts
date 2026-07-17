import { Profile } from './Profile';

export interface Review {
  id: number;
  comment: string;
  rating: number;
  userHasLiked: boolean;
  likes: number;
  user: {
    username: string;
    profilePictureUrl: string;
    fullName: string;
    userId: Profile.Public['userId'];
  }
}

export interface TrendingReview {
  comment: string;
  rating: number;
  username: string;
  profilePictureUrl: string;
  fullName: string;
  userId: Profile.Public['userId'];
  song: {
    id: string;
    name: string;
    imageUrl: string;
  }
}
