'use client';

import { getAllGenres } from "@MusicMe/lib/discover";
import { useQuery } from "@tanstack/react-query";
import { ScaleLoader } from "react-spinners";
import { GenreTile } from "./GenreTiles";

export default function Genres() {
  const { data: genres, isLoading: genresLoading } = useQuery({
    queryKey: ['genre'],
    queryFn: () =>
      getAllGenres().then((data) => {
        return data.genres;
      }),
    staleTime: 1000 * 60 * 60 * 24,
  });

  return (
    <>
      {genresLoading ? (
        <>
          <ScaleLoader color={'#22c55e'} />
        </>
      ) : !genres ? (
        <>Error collecting genres</>
      ) : (
        <div className="flex gap-8 overflow-x-scroll overflow-y-hidden pb-4">
          {genres.map((genre) => (
            <GenreTile genre={genre} key={genre.genreKey}></GenreTile>
          ))}
        </div>
      )}
    </>
  );
}
