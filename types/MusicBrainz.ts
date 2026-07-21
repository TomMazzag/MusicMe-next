export namespace MusicBrainz {
    export interface RecordingResponse {
        count: number
        recordings: Recording[]
    }

    export interface ReleaseResponse {
        count: number
        releases: Release[]
    }
}

interface Recording {
  id: string;
  score: number;
  title: string;
  'artist-credit': ArtistCredit[];
  releases: Release[]
}

interface Release {
  id: string
  title: string
  score: number
  'artist-credit': ArtistCredit[]
  date: string
}

interface ArtistCredit {
  name: string
  artist: {
    id: string
  }
}

interface Release {
  id: string
}

export interface MBZImportBody {
  song: {
    id: string,
    name: string,
    imageUrl: string,
    releaseDate: string | null,
    artists: {
      id: string,
      name: string,
      position?: number,
    }[],
    platforms: {
      musicBrainzId?: string,
      spotifyId?: string,
    },
  }
}
