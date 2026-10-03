import { Artist } from './Artist';

/* eslint-disable @typescript-eslint/no-namespace */
export namespace Profile {
  interface BaseProfile {
    fullName: string;
    profilePictureUrl: string;
    followers: number;
    following: number;
    followedArtistsCount: number;
    likedSongCount: number;
    userId: string;
    reviewCount: number;
    averageRating: number;
    username: string;
    spotifyId: string;
    highlightedSong: HighlightedSong | undefined;
    favouriteGenres: string[];
  }

  export interface User extends BaseProfile {
    email?: string;
  }

  export interface Conneciton {
    userId: string;
    fullName: string;
    profilePictureUrl: string;
    username: string;
    isFollowing: boolean;
    createdAt: string;
    currentUserId: string | undefined;
  }

  export interface FollowingFriend {
    type: 'friend';
    userId: string;
    fullName: string;
    profilePictureUrl: string;
    username: string;
    isFollowing: boolean;
    createdAt: string;
  }

  export interface FollowingArtist {
    type: 'artist';
    id: string;
    name: string;
    imageUrl?: string | null;
    createdAt: string;
  }

  export type FollowingItem = FollowingFriend | FollowingArtist;

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

export interface HighlightedSong {
  id: string;
  name: string;
  artists: Pick<Artist, 'id' | 'name'>[];
  imageUrl: string;
}

export type ActiveTab = 'Playlists' | 'Liked' | 'Analytics';
