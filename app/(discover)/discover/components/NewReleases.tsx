'use client'

import { BACKEND_URL } from "@MusicMe/lib/util";
import { useQuery } from "@tanstack/react-query";
import { ScaleLoader } from "react-spinners";

interface NewRelease {
    id: string
    name: string
    artists: {name: string}[]
    imageUrl: string
}

export default function NewReleases() {
    const { data: tracks, isLoading } = useQuery<NewRelease[]>({
      queryKey: ['newReleases'],
      queryFn: async () =>
        fetch(BACKEND_URL + '/song/releases/new').then(async (data) => {
          return (await data.json()).releases || [];
        }),
    });

    return (
      <>
        {isLoading ? (
          <>
            <ScaleLoader color={'#22c55e'} />
          </>
        ) : (
          tracks && (
            <ul className="flex gap-8">
              {tracks.map((track) => (
                <li className="flex flex-col items-center gap-4 justify-between text-center" key={track.id}>
                  <img src={track.imageUrl} alt={track.name} className="w-30 h-30 rounded-md" />
                  <div className="flex flex-col">
                    <h3 className="font-bold">{track.name}</h3>
                    <p className="text-sm opacity-70">
                      {track.artists.map((artist) => artist.name).join(', ')}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          )
        )}
      </>
    );
};
