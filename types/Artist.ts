export interface Artist {
  id: string;
  name: string;
  imageUrl: string;
  rating: number;
}

export interface SearchArtist {
  id: string;
  name: string;
  imageUrl?: string;
  yearFounded?: number | null;
}

export interface ArtistGenre {
  genreKey: string;
  genreName: string;
  hexColour: string;
}

export interface ArtistSong {
  id: string;
  name: string;
  imageUrl?: string;
  releaseDate?: string;
}

export interface ArtistDetail {
  id: string;
  name: string;
  imageUrl?: string;
  yearFounded?: number | null;
  genres: ArtistGenre[];
  songs: ArtistSong[];
}
