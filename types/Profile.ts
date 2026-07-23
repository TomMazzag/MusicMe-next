export namespace Profile {
  interface BaseProfile {
    fullName: string;
    profilePictureUrl: string;
    followers: number;
    following: number;
    likedSongCount: number;
    userId: string;
    reviewCount: number;
    username: string;
    spotifyId: string;
  }

  export interface User extends BaseProfile {
    email?: string;
  }

  export interface Public extends BaseProfile {}

  export interface Conneciton {
    userId: string;
    fullName: string;
    profilePictureUrl: string;
    username: string;
    isFollowing: boolean;
    currentUserId: string | undefined;
  }

  export interface Analytics {
    message: string;
    highlightedSong: SpotifyApi.TrackObjectFull;
    topArtists: {
      items: SpotifyApi.ArtistObjectFull[];
    };
    topTracks: {
      items: SpotifyApi.TrackObjectFull[];
    };
  }
}

export type ActiveTab = 'Playlists' | 'Liked' | 'Analytics';
