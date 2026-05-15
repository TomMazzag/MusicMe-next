'use client';

import { useCallback, useState } from 'react';
import FirstStage from './components/FirstStage';
import SecondStage from './components/SecondStage';
import ThirdStage from './components/ThirdStage';
import { useQuery } from '@tanstack/react-query';
import { ScaleLoader } from 'react-spinners';
import CreateAccountError from './components/CreateAccountError';
import { createAccount } from '@MusicMe/lib/account';

export interface CreateAccountFormData {
  fullName: string;
  username: string;
  email: string;
  showPublicPlaylists: boolean;
  favoriteGenres: string[];
  profilePicture: string | null;
  id: string;
}

interface SpotifyProfile {
  display_name: string;
  email: string;
  id: string;
  images: { url: string }[];
}

export type UpdateFormDataFunction = (field: keyof CreateAccountFormData, value: string | boolean | string[] | null) => void;

export default function CreateAccount() {
  const [stage, setStage] = useState(1);
  const [formData, setFormData] = useState<CreateAccountFormData>({
    fullName: '',
    username: '',
    email: '',
    showPublicPlaylists: false,
    favoriteGenres: [],
    profilePicture: null,
    id: '',
  });

  const { isLoading: spotifyProfileLoading, error: spotifyProfileError } = useQuery({
    queryKey: ['profile'],
    queryFn: async (): Promise<SpotifyProfile> => {
      const result = await fetch('/api/user/spotify/account', {
        method: 'GET',
        credentials: 'include',
      });
      if (!result.ok) {
        throw new Error('Failed to fetch Spotify profile');
      }
      const data = (await result.json()) as SpotifyProfile;
      setFormData((prev) => ({
        ...prev,
        fullName: data.display_name,
        email: data.email,
        profilePicture: data.images && data.images.length > 0 ? data.images[0].url : null,
        id: data.id,
      }));
      return data;
    },
    retry: false,
  });

  const updateFormData: UpdateFormDataFunction = useCallback((field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }, []);

  function handleNext() {
    setStage((prev) => Math.min(prev + 1, 3));
  }

  function handlePrevious() {
    setStage((prev) => Math.max(prev - 1, 1));
  }

  function handleSubmit() {
    createAccount(formData)
      .then(() => {
        window.location.href = '/account';
      })
      .catch((err) => {
        console.error('Account creation error:', err);
        return <CreateAccountError />;
      });
  }

  if (spotifyProfileError) {
    return <CreateAccountError />;
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-8 md:gap-12">
      <h1 className="text-[4rem]">
        <span className="bg-linear-to-r from-[#4cd7f6] to-[#4be277] bg-clip-text text-transparent">MusicMe</span>
      </h1>

      <div
        className="bg-base-300 p-4 rounded-lg w-[90%] h-[70%] lg:w-1/2 lg:h-2/3 flex flex-col items-center"
        style={{ boxShadow: '0 0 5px rgba(76, 215, 246, 0.5), 0 0 30px rgba(75, 226, 119, 0.3)' }}
      >
        <div className="flex-1 w-full flex justify-center pt-4">
          {spotifyProfileLoading ? (
            <ScaleLoader color={'#22c55e'} />
          ) : (
            <>
              {stage === 1 && <FirstStage formData={formData} updateFormData={updateFormData} />}
              {stage === 2 && <SecondStage formData={formData} updateFormData={updateFormData} />}
              {stage === 3 && <ThirdStage formData={formData} updateFormData={updateFormData} />}
            </>
          )}
        </div>
        <div className="flex justify-between w-full px-4">
          <button className="btn" onClick={handlePrevious}>
            Previous
          </button>
          <button className="btn btn-accent" onClick={stage === 3 ? handleSubmit : handleNext}>
            {stage === 3 ? 'Submit' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
}
