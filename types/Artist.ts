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
