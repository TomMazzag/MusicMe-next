import { Navbar } from '@MusicMe/components/Navbar/Navbar';
import { Title } from '@MusicMe/components/Text';
import { Metadata } from 'next';
import CreatePollForm from './components/form';

export const metadata: Metadata = {
  title: 'Create Poll',
  description:
    'Create a new poll to vote for your favorite tracks, artists or genres! Share your polls with friends or with the community.',
};

export default function CreatePollPage() {
  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center gap-8 py-8 relative w-full">
        <Title bold>Create a new Poll</Title>

        <CreatePollForm />
      </div>
    </>
  );
}
