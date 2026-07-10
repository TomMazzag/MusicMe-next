import clsx from 'clsx';
import { ScaleLoader } from 'react-spinners';

interface LikedSongsProps {
  likedSongs: any;
  isLoading: boolean;
  hidden: boolean
}

export const LikedSongsTab = ({ likedSongs, isLoading, hidden }: LikedSongsProps) => {
  if (likedSongs.length === 0) {
    return <p className={clsx("pb-10", hidden ? 'hidden' : '')}>No liked songs</p>;
  }

  if (isLoading) {
    return <ScaleLoader color={'#22c55e'} />;
  }

  return (
    <div className={clsx("grid grid-cols-3 md:px-16 gap-y-8 gap-x-4", hidden ? 'hidden' : '')}>
      {likedSongs.map((song: any, index: number) => (
        <div className="flex md:items-center justify-center w-full" key={index}>
          <a href={`/song/${song.id}`} className="flex flex-col lg:flex-row gap-5 items-center grow md:pr-0">
            <img src={song.image} alt={`Image for ${song.name}`} className="h-20 lg:h-30" />
            <div className="md:grow text-center md:text-start">
              <h3 className="text-sm lg:text-base">{song.name}</h3>
              <p className="text opacity-60 text-sm">{song.artists[0].name}</p>
            </div>
          </a>
        </div>
      ))}
    </div>
  );
};
