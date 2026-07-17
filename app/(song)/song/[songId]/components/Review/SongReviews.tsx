'use client';

import { Review } from "@MusicMe/types/Review";
import { useQuery } from "@tanstack/react-query";
import { ScaleLoader } from "react-spinners";
import { ReviewBox } from "./ReviewBox";

export default function SongReviews({ songId }: { songId: string }) {
  const { data: reviews, isLoading: reviewsLoading } = useQuery({
    queryKey: ['reviews', songId],
    queryFn: async (): Promise<Review[]> => {
      const req = await fetch(`/api/song/${songId}/reviews`);
      const data = await req.json();
      return data.reviews || [];
    },
  });


  return (
    <div
      className={`flex ${
        reviews && reviews.length > 0
          ? 'w-[90%] md:w-[50%] justify-start my-4 flex-col grow overflow-y-auto gap-4'
          : 'grow items-center justify-center w-[75%] md:w-full'
      }`}
    >
      {reviewsLoading ? (
        <ScaleLoader color={'#22c55e'} />
      ) : (
        <div>
          {reviews && reviews.length > 0 ? (
            reviews.map((review) => (
              <ReviewBox review={review} key={review.id} />
            ))
          ) : (
            <p className="grow">No comments yet! Be the first to leave a comment about this song</p>
          )}
        </div>
      )}
    </div>
  );
}
