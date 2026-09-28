import { FeedItem } from '@MusicMe/types/Feed';
import { FeedItemBox } from './FeedItem';

interface FeedItemListProps {
  items: FeedItem[];
}

function formatReleaseDate(date: string) {
  const [year, month, day] = date.split('-').map(Number);
  return new Date(year, month - 1, day).toLocaleDateString(window.navigator.language, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function FeedItemList({ items }: FeedItemListProps) {
  const firstItem = items[0];
  return (
    <article className="bg-base-300 rounded-lg p-4">
      <div className="flex items-center justify-between">
        <p className="text-sm opacity-70 mb-3">New songs by {firstItem.artist}</p>
        {firstItem.releaseDate && (
          <p className="text-sm opacity-70 mt-0.5">{formatReleaseDate(firstItem.releaseDate)}</p>
        )}
      </div>
      <ul className="flex flex-col gap-4">
        {items.map((item) => (
          <li key={item.id}>
            <FeedItemBox item={item} />
          </li>
        ))}
      </ul>
    </article>
  );
}
