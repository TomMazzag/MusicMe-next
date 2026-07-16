import { ScaleLoader } from 'react-spinners';
import { ImageUpload } from './genral/ImageUpload';
import InputField from '@MusicMe/components/Input/InputField';
import { UserDetails } from './ClientSideContainer';

export const General = ({ user, isUserLoaded }: UserDetails) => {
  if (!isUserLoaded) {
    return <ScaleLoader color={'#22c55e'} />;
  }
  if ((isUserLoaded && user === null) || user === undefined) {
    return <div>Error loading account details, please try again later.</div>;
  }
  if (user === null || user === undefined) {
    return <div>Error loading account details, please try again later.</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <h1 className="text-2xl font-bold">General settings</h1>

      <div className="flex flex-col items-center justify-center gap-4">
        <InputField label="Username" currentState={user.username || ''} setState={() => {}} />
        <InputField label="Email" currentState={user.emailAddresses[0].emailAddress || ''} setState={() => {}} />
        <InputField label="First Name" currentState={user.firstName || ''} setState={() => {}} />
        <InputField label="Last Name" currentState={user.lastName || ''} setState={() => {}} />
        <ImageUpload user={user} />
        <div className="mt-8">
          <p className="font-bold">User ID:</p>
          <p className="text-gray-500">{user.id}</p>
          <p className="text-gray-500">Share this if you need help with your account.</p>
        </div>
      </div>
    </div>
  );
};
