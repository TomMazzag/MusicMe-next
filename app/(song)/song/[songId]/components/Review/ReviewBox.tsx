import { useState } from 'react';
import { Review } from '@MusicMe/types/Review';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface ReviewProps {
  review: Review;
}

export const ReviewBox = ({ review }: ReviewProps) => {
  const [likedStatus, setLikedStatus] = useState({
    liked: review.userHasLiked,
    likeCount: review.likes || 0,
  });

  const toggleLike = async () => {
    setLikedStatus((prevStatus) => {
      const newLikes = prevStatus.liked ? prevStatus.likeCount - 1 : prevStatus.likeCount + 1;
      return {
        liked: !prevStatus.liked,
        likeCount: newLikes,
      };
    });

    try {
      await fetch(`/api/review/${review.id}/like`, {
        method: 'POST',
      });
    } catch (error) {
      console.error('Error toggling like:', error);
      setLikedStatus((prevStatus) => ({
        liked: !prevStatus.liked,
        likeCount: prevStatus.liked ? prevStatus.likeCount + 1 : prevStatus.likeCount - 1,
      }));
    }
  };

  return (
    <div className="text-left px-4 py-4 bg-base-200 rounded-[20px] relative">
      <div className="flex items-center gap-2 mb-2 lg:mb-4">
        <img
          src={review.user.profilePictureUrl}
          alt="Users profile picture"
          className="rounded-full h-12 w-12 lg:h-16 lg:w-16 object-cover"
        />
        <a className="flex flex-col hover:underline" href={`/user/${review.user.userId}`}>
          <h2 className="font-bold">{review.user.fullName}</h2>
          <h3 className="opacity-70 text-sm">@{review.user.username}</h3>
        </a>
      </div>

      <div className="pl-2 mr-[10%]">
        <p>{review.comment}</p>
      </div>

      <div className="absolute top-[10%] right-[10px] flex items-center gap-1 border-accent border-2 rounded-full px-2 py-1">
        <p>{review.rating}</p>
        <span className="text-accent">
          <FontAwesomeIcon icon={faStar} />
        </span>
      </div>

      <button className="absolute top-[60%] right-[10px] lg:right-[20px]" onClick={toggleLike}>
        <i className={likedStatus.liked ? 'fa-solid fa-heart text-[20px]' : 'fa-regular fa-heart text-[20px]'}></i>
        <span className="ml-[4px]">{likedStatus.likeCount}</span>
      </button>
    </div>
  );
};
