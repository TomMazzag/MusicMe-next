export interface Genre {
    genreKey: PlatformGenres;
    genreName: string;
    image?: string;
    shortDescription: string;
    hexColour: string
}

export type PlatformGenres = 'dnb' | 'house' | 'rnb' | 'dance' | 'country' | 'rock' | 'jazz' | 'electronic' | 'rap' | 'indie';