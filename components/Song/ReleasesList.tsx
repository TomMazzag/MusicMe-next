'use client';

import { SongData } from '@MusicMe/types/Song';
import Image from 'next/image';
import { ScaleLoader } from 'react-spinners';
import UpcomingRelease from '@MusicMe/components/Song/UpcomingRelease';

interface ReleasesListProps {
  tracks?: SongData[];
  isLoading: boolean;
}

export default function ReleasesList({ tracks, isLoading }: ReleasesListProps) {
  if (isLoading) {
    return <ScaleLoader color={'#22c55e'} />;
  }

  if (!tracks?.length) {
    return <p className="opacity-70 px-2">No new releases this year.</p>;
  }

  return (
    <div className="overflow-x-scroll">
      <ul className="flex gap-8 p-2">
        {tracks.map((track) => (
          <li className="flex flex-col items-center gap-4 justify-between text-center group shrink-0" key={track.id}>
            <a href={`/song/${track.id}`}>
              {track.releaseDate && new Date(track.releaseDate) > new Date() ? (
                <UpcomingRelease />
              ) : (
                <Image
                  height={120}
                  width={120}
                  src={track.imageUrl || ''}
                  alt={track.name}
                  className="w-30 h-30 rounded-md group-hover:scale-105 transition-transform"
                />
              )}
              <div className="flex flex-col">
                <h3 className="font-bold max-w-30 truncate">{track.name}</h3>
                <p className="text-sm opacity-70 max-w-30">{track.artists.map((artist) => artist.name).join(', ')}</p>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
