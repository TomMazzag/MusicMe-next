import { Analytics } from '@MusicMe/types/Analytics';
import StarRating from '@MusicMe/components/Util/StarRating';
import { StatsTile } from '../StatTile';
import { FavouriteGenresTile } from './components/analytics/FavouriteGenres';
import { HighlightedSongTile } from './components/analytics/HighlightedSong';
import clsx from 'clsx';

interface AnalyticsTabProps {
  hidden: boolean;
  analyticsData: Analytics;
  isCurrentUser: boolean;
}

export const AnalyticsTab = ({
  hidden,
  analyticsData: { reviewCount, averageRating, likedSongs, highlightedSong, favouriteGenres },
  isCurrentUser,
}: AnalyticsTabProps) => {
  return (
    <div className={`${hidden ? 'hidden' : 'grid grid-cols-1 md:grid-cols-[35%_65%] w-full'}`}>
      <div
        className={clsx(
          'flex flex-col gap-4 border-b-accent border-b-2',
          'md:border-r-accent md:border-r-2 md:border-b-0',
          // Remove pb-20 once more content is added
          'pb-20',
        )}
      >
        {highlightedSong ? (
          <HighlightedSongTile highlightedSong={highlightedSong} isCurrentUser={isCurrentUser} />
        ) : (
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-bold text-center">Highlighted Song</h2>
            <p className="text-center">No highlighted song found</p>
          </div>
        )}
        <FavouriteGenresTile favouriteGenres={favouriteGenres} />
      </div>

      <div className="lg:px-8 items-center px-4 md:px-0">
        <h2 className="text-2xl font-bold text-center mt-8 md:mt-0 mb-4">Stats</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-8 mx-auto max-w-150">
          <StatsTile heading="Songs liked" statValue={String(likedSongs)} />
          <StatsTile heading="Total Reviews" statValue={String(reviewCount)} />
          <div className="flex items-center flex-col bg-base-300 rounded-2xl md:rounded-md p-4 px-2 gap-2">
            <h1 className="text-xl">Average Rating</h1>
            {reviewCount > 0 ? (
              <>
                <p className="flex-1 text-4xl font-semibold text-accent tabular-nums">{averageRating.toFixed(1)}</p>
                <StarRating value={averageRating} readOnly size="sm" />
              </>
            ) : (
              <p className="flex-1 text-4xl font-semibold text-accent">—</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
