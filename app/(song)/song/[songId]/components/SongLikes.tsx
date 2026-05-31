'use client';

import clsx from 'clsx';
import { useState } from 'react';
import { toggleLike } from '../functions/ToggleLike';

interface SongLikesProps {
  initialUserLiked: boolean;
  initialLikes: number;
  songId: string;
}

export default function SongLikes({ initialUserLiked, initialLikes, songId }: SongLikesProps) {
  const [userHasLiked, setUserHasLiked] = useState(initialUserLiked);
  const [popping, setPopping] = useState(false);
  const [likes, setLikes] = useState(initialLikes);

  const handleLikeToggle = () => {
    setPopping(true);
    toggleLike(songId)
    setUserHasLiked(!userHasLiked);
    if (userHasLiked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }
    setTimeout(() => {
      setPopping(false);
    }, 150);
  };
  return (
    <>
      <button onClick={handleLikeToggle}>
        <i
          className={clsx([
            'transition-transform duration-300 cursor-pointer',
            popping && 'scale-130',
            userHasLiked ? 'fa-solid fa-heart' : 'fa-regular fa-heart',
          ])}
        ></i>
      </button>
      <p className="text text-xl min-w-16 text-start">
        {likes} {likes === 1 ? 'Like' : 'Likes'}
      </p>
    </>
  );
}
