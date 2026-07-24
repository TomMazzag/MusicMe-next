'use client';

import { ChartNoAxesColumnIncreasing } from 'lucide-react';
import { ProgressionArrowUp } from '../components/TopStatProgressionArrows';
import { TrendingReview } from '@MusicMe/types/Review';
import { getTopReviews, getTopViewedArtists, getTopViewedTracks } from '@MusicMe/lib/discover';
import { useQuery } from '@tanstack/react-query';
import { ScaleLoader } from 'react-spinners';
import { SongSearchTile } from './SongSearchTile';
import { Artist } from '@MusicMe/types/Artist';

interface TrackWithViews {
  id: string;
  name: string;
  imageUrl: string;
  viewCount: number;
  artists: string[];
}

export default function TodaysStats() {
  const { data: tracks, isLoading } = useQuery<TrackWithViews[]>({
    queryKey: ['song'],
    queryFn: async () =>
      getTopViewedTracks().then((data) => {
        return data.topSongs || [];
      }),
  });

  const { data: reviews, isLoading: reviewsLoading } = useQuery<TrendingReview[]>({
    queryKey: ['review'],
    queryFn: async () =>
      getTopReviews().then((data) => {
        return data.songData || [];
      }),
  });

  const { data: artists, isLoading: artistsLoading } = useQuery<Artist[]>({
    queryKey: ['artist'],
    queryFn: async () =>
      getTopViewedArtists().then((data) => {
        return data.artistData || [];
      }),
  });

  return (
    <div className="md:grid grid-cols-3 gap-8 flex flex-col">
      <div className="bg-base-300 p-4 rounded-lg text-center">
        <h1 className="text text-2xl mb-6">Top viewed songs today</h1>
        {isLoading ? (
          <>
            <ScaleLoader color={'#22c55e'} />
          </>
        ) : (
          tracks && (
            <ul className="flex flex-col gap-4">
              {tracks.map((track) => (
                <li className="flex items-center gap-4 w-full justify-between" key={track.id}>
                  <ProgressionArrowUp />
                  <SongSearchTile
                    data={{
                      imageUrl: track.imageUrl,
                      value1: track.name,
                      value2: track.artists.map((artist) => artist).join(', '),
                      trackId: track.id,
                    }}
                  />
                  <div className="flex" title="Track views">
                    <ChartNoAxesColumnIncreasing />
                    <span className="w-[3ch] text-right" title="Track views">
                      {track.viewCount}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          )
        )}
      </div>
      <div className="bg-base-300 p-4 rounded-lg text-center">
        <h1 className="text text-2xl mb-6">Top viewed artists today</h1>
        <>
          {artistsLoading ? (
            <>
              <ScaleLoader color={'#22c55e'} />
            </>
          ) : artists && artists.length > 0 ? (
            <ul className="flex flex-col gap-4 items-center">
              {artists.map((artist) => (
                <li key={artist.id}>
                  <a href={`/artist/${artist.id}`} className="flex items-center gap-4 w-full">
                    <img src={artist.imageUrl} alt="" className="h-14 min-w-14 rounded" />
                    <div className="flex flex-col text-start">
                      <p>{artist.name}</p>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <>
              <p>No data today, check back tomorrow for new data</p>
            </>
          )}
        </>
      </div>
      <div className="bg-base-300 p-4 rounded-lg text-center">
        <h1 className="text text-2xl mb-6">Trending reviews</h1>
        {reviewsLoading ? (
          <>
            <ScaleLoader color={'#22c55e'} />
          </>
        ) : reviews && reviews.length > 0 ? (
          <ul className="flex flex-col gap-4">
            {reviews.map((review) => (
              <li key={review.song.id}>
                <a href={`/song/${review.song.id}`} className="flex items-center gap-4 w-full">
                  <img src={review.song.imageUrl} alt="" className="h-14 min-w-14 rounded" />
                  <div className="flex flex-col text-start">
                    <p>{review.comment}</p>
                    <p className="opacity-60">@{review.username}</p>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <>
            <p>No data today, check back tomorrow for new data</p>
          </>
        )}
      </div>
    </div>
  );
}
