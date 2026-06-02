import { ProfileBadges } from '@MusicMe/app/(discover)/discover/components/Genre/GenreBadges';
import { Genre } from '@MusicMe/types/Genre';
import clsx from 'clsx';

interface GenreSelectorProps {
  genres: Genre[] | undefined;
  formData: {
    selectedGenres: string[];
  };
  toggleGenre: (genreKey: string) => void;
}

export default function GenreSelector({ genres, formData, toggleGenre }: GenreSelectorProps) {
  return (
    <div className='grid grid-cols-3 gap-4'>
      {genres &&
        genres.map((genre) => (
          <button
            className={clsx([
              'hover:opacity-100 transition-transform active:scale-[1.1]',
              formData.selectedGenres.includes(genre.genreKey) ? 'opacity-100' : 'opacity-20',
            ])}
            onClick={() => toggleGenre(genre.genreKey)}
            key={genre.genreKey}
          >
            <div className="flex justify-center">{ProfileBadges[genre.genreKey].component}</div>
          </button>
        ))}
    </div>
  );
}
