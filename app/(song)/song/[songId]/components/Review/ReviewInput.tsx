'use client';

import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import StarRating from '@MusicMe/components/Util/StarRating';

type Props = {
  songId: string;
};

export default function ReviewInput({ songId }: Props) {
  const queryClient = useQueryClient();
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const canSubmit = rating != null && comment.trim().length > 0 && !isSubmitting;

  const submitReview = async () => {
    if (!canSubmit || rating == null) {
      setError('Please select a rating and enter a comment before submitting.');
      return;
    }

    setError(null);
    setIsSubmitting(true);

    try {
      const response = await fetch(`/api/review/song/${songId}`, {
        method: 'POST',
        body: JSON.stringify({ comment: comment.trim(), rating }),
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.error || 'Failed to submit review.');
        return;
      }

      queryClient.invalidateQueries({ queryKey: ['reviews', songId] });
      setComment('');
      setRating(null);
    } catch {
      setError('Failed to submit review.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      await submitReview();
    }
  };

  return (
    <div className="w-full flex flex-col items-center gap-2 md:mb-4">
      <StarRating value={rating ?? 0} onChange={setRating} size="lg" />
      <input
        type="text"
        placeholder="This song reminds me of..."
        id="comment-input"
        className="input input-bordered w-full rounded-3xl md:w-[65%]"
        value={comment}
        onChange={(e) => {
          setComment(e.target.value);
          if (error) setError(null);
        }}
        onKeyDown={handleKeyDown}
      />
      {error && <p className="text-error text-sm">{error}</p>}
    </div>
  );
}
