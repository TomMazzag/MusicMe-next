import { LIKED_SONG_SORT_OPTIONS, LikedSongData, LikedSongSort } from '@MusicMe/types/LikedSong';
import clsx from 'clsx';
import { ScaleLoader } from 'react-spinners';

interface LikedSongsProps {
  likedSongs: LikedSongData[] | undefined;
  isLoading: boolean;
  hidden: boolean;
  sort: LikedSongSort;
  onSortChange: (sort: LikedSongSort) => void;
}

export const LikedSongsTab = ({ likedSongs, isLoading, hidden, sort, onSortChange }: LikedSongsProps) => {
  if (!hidden && isLoading) {
    return <ScaleLoader color={'#22c55e'} />;
  }

  if (!hidden && likedSongs && likedSongs.length === 0) {
    return <p className={clsx('pb-10', hidden ? 'hidden' : '')}>No liked songs</p>;
  }

  return (
    <div className={clsx('w-full', hidden ? 'hidden' : '')}>
      <div className="flex justify-end md:px-16 mb-6">
        <label className="flex items-center gap-2 text-sm">
          <span className="opacity-70 whitespace-nowrap">Sort by</span>
          <select
            className="select select-bordered select-sm"
            value={sort}
            onChange={(e) => onSortChange(e.target.value as LikedSongSort)}
            id="liked-songs-sort"
          >
            {LIKED_SONG_SORT_OPTIONS.map((option) => (
              <option value={option.value} key={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="grid grid-cols-3 md:px-16 gap-y-8 gap-x-4">
        {likedSongs &&
          likedSongs.map((song) => (
            <div className="flex md:items-center justify-center w-full" key={song.id}>
              <a href={`/song/${song.id}`} className="flex flex-col lg:flex-row gap-5 items-center grow md:pr-0">
                <img src={song.imageUrl} alt={`Image for ${song.name}`} className="h-20 lg:h-30" />
                <div className="md:grow text-center md:text-start">
                  <h3 className="text-sm lg:text-base">{song.name}</h3>
                  <p className="text opacity-60 text-sm">{song.artists[0]?.name}</p>
                </div>
              </a>
            </div>
          ))}
      </div>
    </div>
  );
};
