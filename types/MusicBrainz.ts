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
}

interface ArtistCredit {
  name: string
}
