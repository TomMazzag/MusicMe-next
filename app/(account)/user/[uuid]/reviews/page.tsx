import { UserReviewCard } from '@MusicMe/components/User/UserReviewCard';
import { Navbar } from '@MusicMe/components/Navbar/Navbar';
import { getUserReviews } from '@MusicMe/lib/review';

type Props = {
  params: Promise<{
    uuid: string;
  }>;
};

export default async function UserReviewsPage({ params }: Props) {
  const { uuid } = await params;
  const { user, reviews } = await getUserReviews(uuid);

  return (
    <>
      <Navbar />
      <div className="flex items-center p-5 md:p-10 flex-col">
        <p className="text text-l md:text-2xl">Reviews by {user.fullName}</p>

        <div className="flex flex-col w-full gap-3 py-5 md:w-[50%]">
          {reviews.length > 0 ? (
            reviews.map((review) => <UserReviewCard key={review.id} review={review} />)
          ) : (
            <p className="text text-center py-20">No reviews found by this user.</p>
          )}
        </div>
      </div>
    </>
  );
}
