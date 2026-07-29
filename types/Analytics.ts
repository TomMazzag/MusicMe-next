import { HighlightedSong } from "./Profile";

export interface Analytics {
  reviewCount: number;
  averageRating: number;
  likedSongs: number;
  highlightedSong: HighlightedSong | undefined;
  favouriteGenres: string[];
}