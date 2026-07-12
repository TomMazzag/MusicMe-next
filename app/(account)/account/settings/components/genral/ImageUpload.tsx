'use client';
import { UserResource } from '@clerk/nextjs/types';
import Image from 'next/image';
import { useRef } from 'react';

export const ImageUpload = ({ user }: { user: UserResource }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = async () => {
    inputRef.current?.click();
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      user.setProfileImage({ file });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <Image src={user.imageUrl || ''} alt={'User Profile Picture'} width={100} height={100} />
      <input type="file" accept={'image/*'} ref={inputRef} style={{ display: 'none' }} onChange={handleChange} />
      <button className="btn btn-outline" onClick={handleClick}>
        Upload new picture
      </button>
    </div>
  );
};
