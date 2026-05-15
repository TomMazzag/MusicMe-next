import { faAt, faMailBulk, faUser } from '@fortawesome/free-solid-svg-icons';
import InputField from '@MusicMe/components/Input/InputField';
import { CreateAccountFormData, UpdateFormDataFunction } from '../page';
import Toggle from '@MusicMe/components/Input/Toggle';

interface FirstStageProps {
  formData: CreateAccountFormData;
  updateFormData: UpdateFormDataFunction;
}

export default function FirstStage({ formData, updateFormData }: FirstStageProps) {
  return (
    <div className="flex flex-col gap-6 w-full lg:w-1/2">
      <InputField
        label="Full name"
        placeholder="Enter your full name"
        currentState={formData.fullName}
        setState={(value) => updateFormData('fullName', value)}
        icon={faUser}
      />
      <InputField
        label="Username"
        placeholder="Enter your username"
        currentState={formData.username}
        setState={(value) => updateFormData('username', value)}
        icon={faAt}
      />
      <InputField
        label="Email"
        placeholder="Enter your email"
        currentState={formData.email}
        setState={(value) => updateFormData('email', value)}
        icon={faMailBulk}
      />
      <div className="bg-base-100 p-4 py-2 rounded-sm border border-accent flex items-center justify-between">
        <div>
            <p>Show my public playlists</p>
            <p className='text-sm opacity-70'>Share your music taste!</p>
        </div>
        <Toggle
          checked={formData.showPublicPlaylists}
          onChange={(value) => updateFormData('showPublicPlaylists', value)}
        />
      </div>
    </div>
  );
}
