import { FeedItem } from '@MusicMe/types/Feed';
import { ChartNoAxesColumnIncreasing, Heart, MessageSquare } from 'lucide-react';

interface FeedItemTileProps {
  item: FeedItem;
}

export function FeedItemTile({ item }: FeedItemTileProps) {
  return (
    <article className="bg-base-300 rounded-lg p-4">
      <p className="text-sm opacity-70 mb-3">New song by {item.artist}</p>
      <a href={`/song/${item.id}`} className="flex items-center gap-4 group">
        <img
          src={item.imageUrl || ''}
          alt={item.name}
          className="h-20 w-20 rounded-md object-cover shrink-0 group-hover:scale-105 transition-transform"
        />
        <div className="flex flex-1 items-center justify-between gap-4 min-w-0">
          <div className="min-w-0">
            <h2 className="font-bold text-lg truncate">{item.name}</h2>
            <div className="flex items-center gap-3 text-sm opacity-70 mt-1">
              <span className="flex items-center gap-1" title="Likes">
                <Heart size={14} />
                <span className="tabular-nums">{item.likes}</span>
              </span>
              <span className="flex items-center gap-1" title="Reviews">
                <MessageSquare size={14} />
                <span className="tabular-nums">{item.reviewCount}</span>
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0 opacity-70" title="Views today">
            <ChartNoAxesColumnIncreasing size={16} />
            <span className="tabular-nums">{item.viewsToday}</span>
          </div>
        </div>
      </a>
    </article>
  );
}
