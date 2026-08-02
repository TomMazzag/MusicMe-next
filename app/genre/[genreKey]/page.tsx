import type { CSSProperties } from 'react';
import { Navbar } from '@MusicMe/components/Navbar/Navbar';
import { getGenreByKey } from '@MusicMe/lib/discover';
import clsx from 'clsx';
import TopArtists from './components/TopArtists';
import NewReleases from './components/NewReleases';
import Promoters from './components/Promoters';

type Props = {
  params: Promise<{
    genreKey: string;
  }>;
};

export default async function GenrePage({ params }: Props) {
  const { genreKey } = await params;
  const { genre, promoters, artists } = await getGenreByKey(genreKey);
  const { hexColour } = genre;

  return (
    <>
      <Navbar />
      {genre.image && <link rel="preload" as="image" href={genre.image} fetchPriority="high" />}
      <div
        className={clsx('w-full h-[50vh] md:h-[60vh] flex flex-col justify-center px-16 gap-4')}
        style={{
          backgroundColor: `${hexColour}30`,
          ...(genre.image && {
            backgroundImage: `url(${genre.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }),
        }}
      >
        <h1 className="text-4xl font-bold">{genre.genreName}</h1>
        <p className="max-w-100 opacity-70">{genre.shortDescription}</p>
        <div>
          <button
            className="rounded-lg px-4 py-2 cursor-pointer transition-colors hover:bg-(--genre-hex) hover:text-white border-(--genre-hex) border-[1px]"
            style={{'--genre-hex': hexColour } as CSSProperties}
          >
            Follow feed
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-6 p-4 mb-4 w-full">
        {promoters.length > 0 && <Promoters promoters={promoters} />}
        <TopArtists artists={artists} genreHexColour={hexColour} />
        <NewReleases genreKey={genreKey} />
      </div>
    </>
  );
}
