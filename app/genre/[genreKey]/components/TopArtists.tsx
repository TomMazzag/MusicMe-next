interface TopArtistsProps {
  artists: Artist[];
  genreHexColour: string;
}

export default function TopArtists({ artists, genreHexColour }: TopArtistsProps) {
  return (
    <section id="topArtists">
      <h1 className="text-2xl">Top Artists</h1>
      {artists.map((artist) => (
        <ArtistBage artist={artist} genreHexColour={genreHexColour} />
      ))}
    </section>
  );
}

interface Artist {
  name: string;
  rating: number;
  image: string;
}

interface ArtistBadgeProps {
  artist: Artist;
  genreHexColour: string;
}

function ArtistBage({ artist, genreHexColour }: ArtistBadgeProps) {
  return (
    <div>
      <img src={artist.image} alt={`Image of ${artist.name}`} />
      <h3>{artist.name}</h3>
      <p style={{ color: genreHexColour }}>{artist.rating}</p>
    </div>
  );
}
