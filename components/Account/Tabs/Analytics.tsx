import { Analytics } from '@MusicMe/types/Analytics';
import { StatsTile } from '../StatTile';
import { HighlightedSongTile } from './components/analytics/HighlightedSong';

interface AnalyticsTabProps {
  hidden: boolean;
  analyticsData: Analytics;
  isCurrentUser: boolean;
}

export const AnalyticsTab = ({
  hidden,
  analyticsData: { reviewCount, likedSongs, highlightedSong },
  isCurrentUser,
}: AnalyticsTabProps) => {
  return (
    <div className={`${hidden ? 'hidden' : 'flex flex-col gap-4'}`}>
      {highlightedSong && (
        <HighlightedSongTile highlightedSong={highlightedSong} isCurrentUser={isCurrentUser} />
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <StatsTile heading="Songs liked" statValue={String(likedSongs)} />
        <StatsTile heading="Total Reviews" statValue={String(reviewCount)} />
      </div>
    </div>
  );
};
