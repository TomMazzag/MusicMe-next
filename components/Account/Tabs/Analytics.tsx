import { Analytics } from '@MusicMe/types/Analytics';
import { StatsTile } from '../StatTile';
import { FavouriteGenresTile } from './components/analytics/FavouriteGenres';
import { HighlightedSongTile } from './components/analytics/HighlightedSong';

interface AnalyticsTabProps {
  hidden: boolean;
  analyticsData: Analytics;
  isCurrentUser: boolean;
}

export const AnalyticsTab = ({
  hidden,
  analyticsData: { reviewCount, likedSongs, highlightedSong, favouriteGenres },
  isCurrentUser,
}: AnalyticsTabProps) => {
  return (
    <div className={`${hidden ? 'hidden' : 'flex flex-col gap-6 w-[80%]'}`}>
      {highlightedSong && (
        <HighlightedSongTile highlightedSong={highlightedSong} isCurrentUser={isCurrentUser} />
      )}
      <FavouriteGenresTile favouriteGenres={favouriteGenres} />

      <h2 className="text-2xl font-bold text-center">Stats</h2>
      <div className="grid grid-cols-2 md:grid-cols-2 gap-4 mx-auto">
        <StatsTile heading="Songs liked" statValue={String(likedSongs)} />
        <StatsTile heading="Total Reviews" statValue={String(reviewCount)} />
      </div>
    </div>
  );
};
