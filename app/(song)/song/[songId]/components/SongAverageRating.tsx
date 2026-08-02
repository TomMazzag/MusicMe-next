'use client';

import StarRating from '@MusicMe/components/Util/StarRating';
import { Review } from '@MusicMe/types/Review';
import { useQuery } from '@tanstack/react-query';
import clsx from 'clsx';

type Props = {
  songId: string;
  initialAverageRating?: number;
  initialReviewCount?: number;
};

export default function SongAverageRating({ songId, initialAverageRating = 0, initialReviewCount = 0 }: Props) {
  const { data: reviews } = useQuery({
    queryKey: ['reviews', songId],
    queryFn: async (): Promise<Review[]> => {
      const req = await fetch(`/api/song/${songId}/reviews`);
      const data = await req.json();
      return data.reviews || [];
    },
  });

  const reviewCount = reviews?.length ?? initialReviewCount;
  const averageRating =
    reviews && reviews.length > 0
      ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
      : initialAverageRating;
  const displayRating = reviewCount === 0 ? 0 : averageRating;
  const ratingText = reviewCount === 0 ? 'No ratings yet' : `${displayRating.toFixed(1)}`;

  return (
    <div className="flex gap-2 items-center justify-center" title="Average rating">
      <StarRating value={displayRating} readOnly size="sm" className="min-w-24" />
      <p
        className={clsx('lg:text-xl tabular-nums', reviewCount === 0 ? 'opacity-60' : '')}
        aria-label="average song rating"
      >
        {ratingText}
      </p>
    </div>
  );
}
