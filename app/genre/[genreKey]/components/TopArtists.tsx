import { Artist } from '@MusicMe/types/Artist';
import GenrePageSection from './GenrePageSection';

interface TopArtistsProps {
  artists: Artist[];
  genreHexColour: string;
}

export default function TopArtists({ artists, genreHexColour }: TopArtistsProps) {
  return (
    <GenrePageSection id="topArtists" sectionTitle="Top Artists">
      <div className="flex gap-6 lg:gap-10 overflow-x-scroll">
        {artists.map((artist) => (
          <ArtistBage artist={artist} genreHexColour={genreHexColour} key={artist.id} />
        ))}
      </div>
    </GenrePageSection>
  );
}

interface ArtistBadgeProps {
  artist: Artist;
  genreHexColour: string;
}

function ArtistBage({ artist, genreHexColour }: ArtistBadgeProps) {
  return (
    <div className="flex flex-col items-center gap-2 hover:underline cursor-not-allowed shrink-0">
      <img
        src={artist.imageUrl}
        alt={`Image of ${artist.name}`}
        className="rounded-full w-20 h-20 lg:w-30 lg:h-30 object-cover"
      />
      <h3 className="opacity-70 text-sm">{artist.name}</h3>
      <p style={{ color: genreHexColour }}>{artist.rating}</p>
    </div>
  );
}
