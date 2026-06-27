import { Artist } from "./Artist";

export interface Song {
  name: string;
  likes: number;
  userHasLiked: boolean;
  views: number;
  spotifyData: SpotifyApi.TrackObjectFull;
}

export interface SongV2 {
  name: string;
  likes: number;
  userHasLiked: boolean;
  views: number;
  songData: SongData
}

export interface SongData {
  id: string;
  name: string;
  imageUrl?: string;
  releaseDate?: string;
  artists: Artist[]
}