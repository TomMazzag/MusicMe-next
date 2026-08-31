'use client';

import FullScreenLoader from '@MusicMe/components/Util/FullScreenLoader';
import { SearchTrackItem } from '@MusicMe/lib/songSearch';
import { MBZImportBody } from '@MusicMe/types/MusicBrainz';
import TrackImageLoader from './TrackImageLoader';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export const TrackResult = ({ result }: { result: { items: SearchTrackItem[] } }) => {
  const router = useRouter();
  const [isImporting, setIsImporting] = useState(false);

  const musicBrainzClickHandler = async (track: SearchTrackItem) => {
    if (isImporting) {
      return;
    }

    setIsImporting(true);
    const body: MBZImportBody = {
      song: {
        id: track.id,
        name: track.name,
        imageUrl: track.album.images[0].url,
        releaseDate: track.album.release_date ? track.album.release_date : null,
        artists: track.artists.map((artist) => ({
          id: artist.id,
          name: artist.name,
        })),
        platforms: {
          musicBrainzId: track.id,
        },
      },
    };

    try {
      const returnedId = await fetch('/api/song/mbz/import', {
        method: 'POST',
        body: JSON.stringify(body),
      });
      if (!returnedId.ok) {
        throw new Error('Failed to import song');
      }
      const data = await returnedId.json();
      router.push(`/song/${data.songId}`);
    } catch (error) {
      console.error('Failed to import song from MusicBrainz', error);
      setIsImporting(false);
    }
  };

  const clickHandler = (track: SearchTrackItem) => {
    if (track.source === 'db') {
      router.push(`/song/${track.id}`);
      return;
    }

    if (track.source === 'mbz') {
      void musicBrainzClickHandler(track);
    }
  };

  return (
    <>
      {isImporting && <FullScreenLoader />}
      {result.items.map((track) => (
        <div className="flex items-center justify-center w-[90%] pr-1 md:pr-0" key={`${track.source}-${track.id}`}>
          <div onClick={() => clickHandler(track)} className="flex gap-5 items-center grow cursor-pointer">
            {track.source === 'mbz' ? (
              <TrackImageLoader imageUrl={track.album.images[0].url} id={track.id} />
            ) : (
              <Image height={120} width={120} className="h-30 w-30" src={track.album.images[0].url} alt="" />
            )}
            <div className="grow">
              <h3>{track.name}</h3>
              <p className="opacity-55">{track.artists.map((artist) => artist.name).join(', ')}</p>
            </div>
            <div className="px-5 text-center hidden md:block">
              <i className="fa-solid fa-share"></i>
              <p>Repost</p>
            </div>
          </div>
          {track.external_urls?.spotify && (
            <a href={track.external_urls.spotify} target="_blank">
              <i className="fa-brands fa-spotify fa-2xl px-2"></i>
            </a>
          )}
        </div>
      ))}
    </>
  );
};
