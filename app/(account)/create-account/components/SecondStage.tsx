import { useRef } from 'react';
import { CreateAccountFormData, UpdateFormDataFunction } from '../page';
import { uploadNewProfilePic } from '@MusicMe/lib/account';

interface SecondStageProps {
  formData: CreateAccountFormData;
  updateFormData: UpdateFormDataFunction;
}

export default function SecondStage({ formData, updateFormData }: SecondStageProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    const fileUploadRequest = await uploadNewProfilePic(file);
    if (fileUploadRequest.success) {
      updateFormData('profilePicture', fileUploadRequest.url );
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      handleFile(file);
      e.target.value = '';
    }
  };
  const handleClick = () => {
    inputRef.current?.click();
  };

  return (
    <div className="flex flex-col gap-6 md:w-1/2 text-center justify-evenly h-full pb-4">
      <p className="text-[2rem]">Profile Picture</p>
      <div className="flex justify-center">
        <img
          src={formData.profilePicture || 'https://via.placeholder.com/150'}
          alt="Profile picture"
          className="w-1/2"
        />
      </div>
      <input type="file" accept={'image/*'} ref={inputRef} style={{ display: 'none' }} onChange={handleChange} />
      <button className="btn btn-outline" onClick={handleClick}>
        Upload new picture
      </button>
    </div>
  );
}
