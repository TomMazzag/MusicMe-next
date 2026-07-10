'use client';

import { useCallback, useEffect, useState } from 'react';
import FirstStage from './components/FirstStage';
import SecondStage from './components/SecondStage';
import ThirdStage from './components/ThirdStage';
import { ScaleLoader } from 'react-spinners';
import CreateAccountError from './components/CreateAccountError';
import { createAccount } from '@MusicMe/lib/account';
import { useReverification, useUser } from '@clerk/nextjs';

export interface CreateAccountFormData {
  firstName: string;
  lastName: string;
  username: string;
  showPublicPlaylists: boolean;
  favoriteGenres: string[];
  profilePicture: string | null;
  id: string;
}

export type UpdateFormDataFunction = (
  field: keyof CreateAccountFormData,
  value: string | boolean | string[] | null,
) => void;

export default function CreateAccount() {
  const [stage, setStage] = useState(1);
  const [formData, setFormData] = useState<CreateAccountFormData>({
    firstName: '',
    lastName: '',
    username: '',
    showPublicPlaylists: false,
    favoriteGenres: [],
    profilePicture: null,
    id: '',
  });

  const { user, isLoaded } = useUser();

  useEffect(() => {
    if (user) {
      setFormData({
        ...formData,
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        username: user.username || '',
        id: user.id,
        profilePicture: user.imageUrl || null,
      });
    }
  }, [user]);

  const updateFormData: UpdateFormDataFunction = useCallback((field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }, []);

  const updateProfile = useReverification((data) => user?.update(data));

  if (isLoaded == false) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <ScaleLoader color={'#22c55e'} />
      </div>
    );
  }
  if (!user) return <CreateAccountError />;

  function handleNext() {
    setStage((prev) => Math.min(prev + 1, 3));
  }

  function handlePrevious() {
    setStage((prev) => Math.max(prev - 1, 1));
  }

  async function handleSubmit() {
    updateProfile({ username: formData.username, firstName: formData.firstName, lastName: formData.lastName });
    createAccount(formData)
      .then(() => {
        window.location.href = '/account';
      })
      .catch((err) => {
        console.error('Account creation error:', err);
        return <CreateAccountError />;
      });
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
          {stage === 1 && <FirstStage formData={formData} updateFormData={updateFormData} />}
          {stage === 2 && (
            <SecondStage formData={formData} updateFormData={updateFormData} setProfileImage={user.setProfileImage} />
          )}
          {stage === 3 && <ThirdStage formData={formData} updateFormData={updateFormData} />}
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
