'use client';

import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

type Props = {
  songId: string;
};

export default function ReviewInput({ songId }: Props) {
  const queryClient = useQueryClient();
  const [comment, setComment] = useState('');

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      await fetch(`/api/review/song/${songId}`, {
        method: 'POST',
        body: JSON.stringify({ comment }),
      });
      queryClient.invalidateQueries({ queryKey: ['reviews', songId] });
      setComment('');
    }
  };

  return (
    <div className="w-full flex justify-center md:mb-4">
      <input
        type="text"
        placeholder="This song reminds me of..."
        id="comment-input"
        className="input input-bordered w-full rounded-3xl md:w-[65%]"
        value={comment}
        onChange={(e) => {
          setComment(e.target.value);
        }}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
}
