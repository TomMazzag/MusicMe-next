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
  songData: {
    id: string;
    name: string;
    imageUrl?: string;
    releaseDate?: string;
  }
}