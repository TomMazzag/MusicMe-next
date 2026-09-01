import { Navbar } from '@MusicMe/components/Navbar/Navbar';
import BlankTrack from '@MusicMe/components/Track/BlankTrack';
import { getArtistById } from '@MusicMe/lib/artist';
import Image from 'next/image';
import { notFound } from 'next/navigation';

type Props = {
  params: Promise<{
    artistId: string;
  }>;
};

export default async function ArtistPage({ params }: Props) {
  const { artistId } = await params;
  const artist = await getArtistById(artistId);

  if (!artist) {
    notFound();
  }

  const isSpotifyImage = artist.imageUrl?.includes('i.scdn.co');

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center w-full p-4 md:p-8 gap-8">
        <div className="flex flex-col md:flex-row items-center justify-evenly gap-6 md:gap-10 w-full max-w-3xl">
          {artist.imageUrl ? (
            <div className="shrink-0">
              <img
                src={artist.imageUrl}
                alt={artist.name}
                className="rounded-full w-40 h-40 md:w-48 md:h-48 object-cover"
              />
              {isSpotifyImage && (
                <div className="flex flex-col items-center gap-1 mt-2">
                  <p className="text-sm opacity-60">Image provided by</p>
                  <Image src="/SpotifyLogo.svg" alt="Spotify Logo" width={32} height={32} className="w-20 max-h-5" />
                </div>
              )}
            </div>
          ) : (
            <div className="rounded-full w-40 h-40 md:w-48 md:h-48 bg-base-200 flex items-center justify-center shrink-0">
              <i className="fa-solid fa-user text-6xl opacity-40" />
            </div>
          )}

          <div className="flex flex-col items-center md:items-start gap-3 text-center md:text-left">
            <h1 className="text-3xl md:text-4xl font-semibold">{artist.name}</h1>
            {artist.yearFounded && (
              <p className="opacity-60">Founded {artist.yearFounded}</p>
            )}
            {artist.genres.length > 0 && (
              <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                {artist.genres.map((genre) => (
                  <a
                    key={genre.genreKey}
                    href={`/genre/${genre.genreKey}`}
                    className="rounded-full px-3 py-1 text-sm border transition-colors hover:text-white"
                    style={{
                      borderColor: genre.hexColour,
                      color: genre.hexColour,
                    }}
                  >
                    {genre.genreName}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>

        {artist.songs.length > 0 && (
          <section className="w-full max-w-3xl">
            <h2 className="text-xl font-semibold mb-4">Songs</h2>
            <ul className="flex flex-col gap-3">
              {artist.songs.map((song) => (
                <li key={song.id}>
                  <a
                    href={`/song/${song.id}`}
                    className="flex items-center gap-4 p-2 rounded-lg hover:bg-base-200 transition-colors group"
                  >
                    {song.imageUrl ? (
                      <img
                        src={song.imageUrl}
                        alt={song.name}
                        className="w-14 h-14 rounded-md object-cover shrink-0 group-hover:scale-105 transition-transform"
                      />
                    ) : (
                      <BlankTrack className="w-14 h-14" />
                    )}
                    <div className="min-w-0">
                      <p className="font-medium truncate">{song.name}</p>
                      {song.releaseDate && (
                        <p className="text-sm opacity-60">
                          {new Date(song.releaseDate).getFullYear()}
                        </p>
                      )}
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </>
  );
}
