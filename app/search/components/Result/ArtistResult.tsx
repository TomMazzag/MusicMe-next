import { SearchArtist } from '@MusicMe/types/Artist';

export default function ArtistResult({ result }: { result: { items: SearchArtist[] } }) {
  return (
    <>
      {result.items.map((artist) => (
        <a href={`/artist/${artist.id}`} key={artist.id} className="w-[50%]">
          <div className="flex items-center gap-10 px-8 py-1">
            {artist.imageUrl ? (
              <img src={artist.imageUrl} alt="" className="rounded-[50%] w-24 h-24 object-cover" />
            ) : (
              <div className="rounded-[50%] w-32 h-32 bg-base-200 flex items-center justify-center">
                <i className="fa-solid fa-user text-4xl opacity-40"></i>
              </div>
            )}
            <div>
              <h1 className="text text-2xl">{artist.name}</h1>
            </div>
          </div>
        </a>
      ))}
    </>
  );
}
