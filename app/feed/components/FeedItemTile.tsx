import type { FeedItem } from '@MusicMe/types/Feed';
import { FeedItemBox } from './FeedItem';

interface FeedItemTileProps {
  item: FeedItem;
}

function formatReleaseDate(date: string) {
  const [year, month, day] = date.split('-').map(Number);
  return new Date(year, month - 1, day).toLocaleDateString(window.navigator.language, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function FeedItemTile({ item }: FeedItemTileProps) {
  return (
    <article className="bg-base-300 rounded-lg p-4">
      <div className="flex items-center justify-between">
        <p className="text-sm opacity-70 mb-3">New song by {item.artist}</p>
        {item.releaseDate && <p className="text-sm opacity-70 mt-0.5">{formatReleaseDate(item.releaseDate)}</p>}
      </div>
      <FeedItemBox item={item} />
    </article>
  );
}
