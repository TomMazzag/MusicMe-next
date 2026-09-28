import { FeedItem } from '@MusicMe/types/Feed';

export type FeedListEntry = FeedItem | FeedItem[];

function sameDaySameArtist(a: FeedItem, b: FeedItem): boolean {
  if (!a.releaseDate || !b.releaseDate) return false;
  return a.artist === b.artist && a.releaseDate === b.releaseDate;
}

/** Groups consecutive feed items that share an artist and calendar release date. */
export function groupFeedItems(items: FeedItem[]): FeedListEntry[] {
  const entries: FeedListEntry[] = [];

  for (const item of items) {
    const prev = entries[entries.length - 1];

    if (prev === undefined) {
      entries.push(item);
      continue;
    }

    if (Array.isArray(prev)) {
      if (sameDaySameArtist(prev[0], item)) {
        prev.push(item);
      } else {
        entries.push(item);
      }
      continue;
    }

    if (sameDaySameArtist(prev, item)) {
      entries[entries.length - 1] = [prev, item];
    } else {
      entries.push(item);
    }
  }

  return entries;
}

export function isFeedItemGroup(entry: FeedListEntry): entry is FeedItem[] {
  return Array.isArray(entry);
}
