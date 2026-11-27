import { Button } from '@MusicMe/components/Buttons';
import { Navbar } from '@MusicMe/components/Navbar/Navbar';
import { Title } from '@MusicMe/components/Text';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Zenekio | Polls',
  description: 'Discover platform and community created polls. Vote for your favorite tracks, artists or genres!',
};

export default function PollPage() {
  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center gap-8 py-8 relative">
        <Title bold>All Polls</Title>

        <div className="absolute top-4 right-4">
          <Link href="/polls/create">
            <Button>Create Poll</Button>
          </Link>
        </div>
      </div>
    </>
  );
}
