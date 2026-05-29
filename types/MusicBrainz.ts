export namespace MusicBrainz {
    export interface RecordingResponse {
        count: number
        recordings: Recording[]
    }
}

interface Recording {
  id: string;
  score: number;
  title: string;
  'artist-credit': ArtistCredit[];
  releases: Release[]
}

interface ArtistCredit {
  name: string
}

interface Release {
  id: string
}
