'use client';

import { searchSongs } from '@MusicMe/lib/song';
import { updateHighlightedSong } from '@MusicMe/lib/highlightedSong';
import { SongData } from '@MusicMe/types/Song';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { useState } from 'react';
import { ScaleLoader } from 'react-spinners';

interface Props {
  modalId: string;
  onSongSelected: (song: SongData) => void;
}

export const SongSearchModalSmall = ({ modalId, onSongSelected }: Props) => {
  const [searchInput, setSearchInput] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);

  const { data: tracks, isLoading } = useQuery({
    queryKey: ['song', searchInput],
    queryFn: () => searchSongs(searchInput),
    enabled: searchInput.length > 2,
  });

  const setNewHighlightedSong = async (track: SongData) => {
    const modal = document.getElementById(modalId) as HTMLDialogElement | null;
    if (!modal) {
      return console.log('Modal missing from page');
    }

    setIsUpdating(true);
    try {
      await updateHighlightedSong(track.id);
      onSongSelected(track);
      modal.close();
      setSearchInput('');
    } catch (error) {
      console.error('Failed to update highlighted song', error);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <dialog className="modal" id={modalId}>
      <div className="modal-box">
        <div>
          <label className="input w-full flex gap-2 items-center mb-4">
            <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </g>
            </svg>
            <input
              type="search"
              className="grow py-10"
              placeholder="Search"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
          </label>
          <div className="max-h-[50vh] lg:max-h-[250px] overflow-scroll mb-4">
            {isLoading || isUpdating ? (
              <ScaleLoader color={'#22c55e'} />
            ) : (
              <div className="flex flex-col gap-5">
                {tracks && tracks.length > 0 ? (
                  tracks.map((track) => (
                    <button
                      key={track.id}
                      type="button"
                      className="flex items-center gap-3 text-left hover:bg-base-300 rounded-lg p-2 cursor-pointer"
                      onClick={() => setNewHighlightedSong(track)}
                      disabled={isUpdating}
                    >
                      {track.imageUrl && (
                        <Image src={track.imageUrl} alt="" width={48} height={48} className="rounded-md" />
                      )}
                      <div>
                        <p className="font-medium">{track.name}</p>
                        <p className="text-sm opacity-60">{track.artists.map((artist) => artist.name).join(', ')}</p>
                      </div>
                    </button>
                  ))
                ) : (
                  <p className="opacity-50">Search to begin</p>
                )}
              </div>
            )}
          </div>
          <form method="dialog">
            <button className="btn">Close</button>
          </form>
        </div>
      </div>
    </dialog>
  );
};
