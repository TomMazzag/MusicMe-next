import { Navbar } from '@MusicMe/components/Navbar/Navbar';
import { Metadata } from 'next';
import { FeedList } from './components/FeedList';

export const metadata: Metadata = {
  title: 'Zenekio | Feed',
  description: 'See the latest songs added to Zenekio from artists you follow and across the platform.',
  alternates: {
    canonical: '/feed',
  },
};

export default function FeedPage() {
  return (
    <>
      <Navbar />
      <div className="flex flex-col p-6 gap-8">
        <h1 className="text-3xl font-bold text-center">Feed</h1>
        <FeedList />
      </div>
    </>
  );
}
