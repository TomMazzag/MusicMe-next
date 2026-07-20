import { StatsTile } from "../StatTile";

interface AnalyticsTabProps {
    hidden: boolean;
  reviewCount: number;
  likedSongs: number;
}

export const AnalyticsTab = ({ hidden, reviewCount, likedSongs }: AnalyticsTabProps) => {
  return (
    <div className={`${hidden ? 'hidden' : 'grid grid-cols-1 md:grid-cols-2 gap-4'}`}>
      <StatsTile heading="Songs liked" statValue={String(likedSongs)} />
      <StatsTile heading="Total Reviews" statValue={String(reviewCount)} />
    </div>
  );
};