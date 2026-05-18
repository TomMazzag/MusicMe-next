export interface Song {
  name: string;
  likes: number;
  userHasLiked: boolean;
  views: number;
  spotifyData: SpotifyApi.TrackObjectFull;
}
