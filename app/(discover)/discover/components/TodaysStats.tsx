'use client';

import { ChartNoAxesColumnIncreasing } from 'lucide-react';
import { ProgressionArrowUp } from '../components/TopStatProgressionArrows';
import { TrendingReview } from '@MusicMe/types/Review';
import { getTopReviews, getTopViewedTracks } from '@MusicMe/lib/discover';
import { useQuery } from '@tanstack/react-query';
import { ScaleLoader } from 'react-spinners';
import { SongSearchTile } from './SongSearchTile';

interface TrackWithViews extends SpotifyApi.TrackObjectFull {
  viewCount: number;
}

export default function TodaysStats() {
  const { data: tracks, isLoading } = useQuery<TrackWithViews[]>({
    queryKey: ['song'],
    queryFn: async () =>
      getTopViewedTracks().then((data) => {
        return data.songsData || [];
      }),
  });

  const { data: reviews, isLoading: reviewsLoading } = useQuery<TrendingReview[]>({
    queryKey: ['review'],
    queryFn: async () =>
      getTopReviews().then((data) => {
        console.log(data);
        return data.songsData || [];
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
                      imageUrl: track.album.images[0].url,
                      value1: track.name,
                      value2: track.artists[0].name,
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
          <p>No data today, check back tomorrow for new data</p>
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
              <li className="flex items-center gap-4 w-full" key={review.id}>
                <>
                  <img src={review.album.images[0].url} alt="" className="h-14 rounded" />
                  <div className="flex flex-col text-start">
                    <p>{review.comment}</p>
                    <p className="opacity-60">@{review.username}</p>
                  </div>
                </>
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
