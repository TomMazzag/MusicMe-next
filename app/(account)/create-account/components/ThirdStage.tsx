'use client';

import { FormData, UpdateFormDataFunction } from '../page';
import { getAllGenres } from '@MusicMe/lib/discover';
import { useQuery } from '@tanstack/react-query';
import { ScaleLoader } from 'react-spinners';
import { ProfileBadges } from '@MusicMe/app/(discover)/discover/components/Genre/GenreBadges';
import clsx from 'clsx';

interface ThirdStageProps {
  formData: FormData;
  updateFormData: UpdateFormDataFunction;
}

export default function ThirdStage({ formData, updateFormData }: ThirdStageProps) {
  const { data: genres, isLoading: genresLoading } = useQuery({
    queryKey: ['genre'],
    queryFn: () =>
      getAllGenres().then((data) => {
        return data.genres;
      }),
    staleTime: 1000 * 60 * 60 * 24,
  });

  if (genresLoading) {
    return <ScaleLoader color={'#22c55e'} />;
  }

  function toggleGenre(genreKey: string) {
    if (formData.favoriteGenres.includes(genreKey)) {
      updateFormData(
        'favoriteGenres',
        formData.favoriteGenres.filter((key) => key !== genreKey)
      );
    } else {
      updateFormData('favoriteGenres', [...formData.favoriteGenres, genreKey]);
    }
  }

  return (
    <div className="w-full text-center">
      <h2 className="text-2xl mb-2">Select your favorite genres</h2>
      <p className="text-base-content/70 mb-10">Select your favourite genres below</p>
      <div className="grid grid-cols-3 gap-4">
        {genres &&
          genres.map((genre) => (
            <button
              className={clsx([
                'hover:opacity-100 transition-transform active:scale-[1.1]',
                formData.favoriteGenres.includes(genre.genre_key) ? 'opacity-100' : 'opacity-20',
              ])}
              onClick={() => toggleGenre(genre.genre_key)}
              key={genre.genre_key}
            >
              <div className="flex justify-center">{ProfileBadges[genre.genre_key].component}</div>
            </button>
          ))}
      </div>
    </div>
  );
}
