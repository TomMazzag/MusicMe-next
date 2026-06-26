
import { Genre } from '@MusicMe/types/Genre';
import { ProfileBadges } from './GenreBadges';

interface GenreTileProps {
    genre: Genre;
}

export const GenreTile = ({ genre }: GenreTileProps) => {
    return (
        <a href={`/genre/${genre.genreKey}`} className='hover:scale-105 transition-transform'>
            <div className="bg-base-300 cursor-pointer px-4 py-6 w-52 h-48 rounded-lg flex-none text-center">
                <div className="flex justify-center">{ProfileBadges[genre.genreKey].component}</div>
                <p className="mt-4 opacity-70 text-sm line-clamp-5">{genre.shortDescription}</p>
            </div>
        </a>
    );
};
