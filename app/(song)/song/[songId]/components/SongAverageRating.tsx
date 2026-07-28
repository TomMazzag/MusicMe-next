'use client';

import StarRating from '@MusicMe/components/Util/StarRating';
import { Review } from '@MusicMe/types/Review';
import { useQuery } from '@tanstack/react-query';

type Props = {
  songId: string;
  initialAverageRating?: number;
  initialReviewCount?: number;
};

export default function SongAverageRating({
  songId,
  initialAverageRating = 0,
  initialReviewCount = 0,
}: Props) {
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

  if (reviewCount === 0) {
    return null;
  }

  return (
    <div className="flex gap-2 items-center justify-center" title="Average rating">
      <StarRating value={averageRating} readOnly size="sm" className="min-w-24" />
      <p className="lg:text-xl tabular-nums" aria-label="average song rating">
        {averageRating.toFixed(1)}
      </p>
    </div>
  );
}
