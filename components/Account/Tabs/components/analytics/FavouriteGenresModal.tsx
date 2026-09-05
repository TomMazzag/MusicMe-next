'use client';

import { ProfileBadges } from '@MusicMe/app/(discover)/discover/components/Genre/GenreBadges';
import { updateFavouriteGenres } from '@MusicMe/lib/favouriteGenres';
import { PlatformGenres } from '@MusicMe/types/Genre';
import clsx from 'clsx';
import { useState } from 'react';

const platformGenreKeys = Object.keys(ProfileBadges) as PlatformGenres[];

interface FavouriteGenresModalProps {
  modalId: string;
  onSave: (genres: PlatformGenres[]) => void;
  currentGenres?: PlatformGenres[];
}

export const FavouriteGenresModal = ({ modalId, onSave, currentGenres = [] }: FavouriteGenresModalProps) => {
  const [selectedGenres, setSelectedGenres] = useState<PlatformGenres[]>(currentGenres);
  const [isSaving, setIsSaving] = useState(false);

  const closeModal = () => {
    const modal = document.getElementById(modalId) as HTMLDialogElement | null;
    modal?.close();
  };

  const toggleGenre = (genreKey: PlatformGenres) => {
    setSelectedGenres((current) =>
      current.includes(genreKey) ? current.filter((key) => key !== genreKey) : [...current, genreKey],
    );
  };

  const handleCancel = () => {
    setSelectedGenres(currentGenres);
    closeModal();
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const favouriteGenres = await updateFavouriteGenres(selectedGenres);
      onSave(favouriteGenres);
      closeModal();
    } catch (error) {
      console.error('Failed to update favourite genres', error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <dialog className="modal" id={modalId}>
      <div className="modal-box">
        <h3 className="text-xl font-bold text-center">Select favourite genres</h3>
        <p className="text-center text-base-content/70 mt-1 mb-6">Choose the genres you listen to most</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {platformGenreKeys.map((genreKey) => (
            <button
              key={genreKey}
              type="button"
              className={clsx(
                'hover:opacity-100 transition-transform active:scale-[1.1] flex justify-center',
                selectedGenres.includes(genreKey) ? 'opacity-100' : 'opacity-20',
              )}
              onClick={() => toggleGenre(genreKey)}
            >
              {ProfileBadges[genreKey].component}
            </button>
          ))}
        </div>
        <div className="modal-action">
          <button type="button" className="btn" onClick={handleCancel}>
            Cancel
          </button>
          <button
            type="button"
            className="btn btn-accent"
            onClick={handleSave}
            disabled={selectedGenres.length === 0 || isSaving}
          >
            {isSaving ? 'Saving...' : 'Save'}
          </button>
        </div>
      </div>
    </dialog>
  );
};
