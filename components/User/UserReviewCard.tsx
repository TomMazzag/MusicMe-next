import { UserReview } from '@MusicMe/types/Review';

interface UserReviewCardProps {
  review: UserReview;
}

export function UserReviewCard({ review }: UserReviewCardProps) {
  return (
    <div className="text-left px-4 py-4 bg-base-200 rounded-[20px] relative">
      <a className="flex items-center gap-3 mb-3 hover:opacity-80" href={`/song/${review.song.id}`}>
        <img
          src={review.song.imageUrl}
          alt=""
          className="h-14 w-14 min-w-14 rounded object-cover"
        />
        <div className="flex flex-col min-w-0">
          <h2 className="font-bold truncate">{review.song.name}</h2>
          <p className="opacity-70 text-sm truncate">{review.song.artist}</p>
        </div>
      </a>

      <p className="pl-1 mr-[10%]">{review.comment}</p>

      <div className="absolute top-[10%] right-2.5 flex items-center gap-1 border-accent border-2 rounded-full px-2 py-1">
        <p>{review.rating}</p>
        <span className="text-accent">
          <i className="fa-solid fa-star" />
        </span>
      </div>
    </div>
  );
}
