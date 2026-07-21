"use client";

import { MBZImportBody } from "@MusicMe/types/MusicBrainz";
import TrackImageLoader from "./TrackImageLoader";
import { useRouter } from "next/navigation";

export const TrackResult = ({ result }: { result: {items: SpotifyApi.TrackObjectFull[]} & {source?: string} }) => {
  const router = useRouter();

  const musicBrainzClickHandler = async (result: SpotifyApi.TrackObjectFull) => {
    const body: MBZImportBody = {
      song: {
        id: result.id,
        name: result.name,
        imageUrl: result.album.images[0].url,
        releaseDate: result.album.release_date ? result.album.release_date : null,
        artists: result.artists.map((artist) => ({
          id: artist.id,
          name: artist.name,
        })),
        platforms: {
          musicBrainzId: result.id,
        },
      },
    };
    const returnedId = await fetch('/api/song/mbz/import', {
      method: 'POST',
      body: JSON.stringify(body),
    });
    if (!returnedId.ok) {
      throw new Error('Failed to import song');
    }
    const data = await returnedId.json();
    router.push(`/song/${data.songId}`);
  };

  return (
    <>
      {result.items.map((result, index: number) => (
        <div className="flex items-center justify-center w-[90%] pr-1 md:pr-0" key={index}>
          <div onClick={() => musicBrainzClickHandler(result)} className="flex gap-5 items-center grow cursor-pointer">
            <TrackImageLoader imageUrl={result.album.images[0].url} id={result.id} />
            <div className="grow">
              <h3>{result.name}</h3>
              <p className="opacity-55">{result.artists[0].name}</p>
            </div>
            <div className="px-5 text-center hidden md:block">
              <i className="fa-solid fa-share"></i>
              <p>Repost</p>
            </div>
          </div>
          {result?.external_urls?.spotify && (
            <a href={result.external_urls.spotify} target="_blank">
              <i className="fa-brands fa-spotify fa-2xl px-2"></i>
            </a>
          )}
        </div>
      ))}
    </>
  );
};
