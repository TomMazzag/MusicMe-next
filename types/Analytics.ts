import { HighlightedSong } from "./Profile";

export interface Analytics {
  reviewCount: number;
  likedSongs: number;
  highlightedSong: HighlightedSong | undefined;
}