import { FormData, UpdateFormDataFunction } from '../page';

interface SecondStageProps {
  formData: FormData;
  updateFormData: UpdateFormDataFunction;
}

export default function SecondStage({ formData, updateFormData }: SecondStageProps) {
  return (
    <div className="flex flex-col gap-6 w-1/2 text-center justify-evenly h-full pb-4">
      <p className='text-[2rem]'>Profile Picture</p>
      <div className='flex justify-center'>
        <img
          src={formData.profilePicture || 'https://via.placeholder.com/150'}
          alt="Profile picture"
          className="w-1/2"
        />
      </div>
      <button
        className="btn btn-outline"
        onClick={() => {
          updateFormData('profilePicture', 'https://via.placeholder.com/150');
        }}
      >
        Upload new picture
      </button>
    </div>
  );
}
