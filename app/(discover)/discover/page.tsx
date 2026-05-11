import { Navbar } from '@MusicMe/components/Navbar/Navbar';
import { Metadata } from 'next';
import { DiscoverSection } from './components/DiscoverSection';
import TodaysStats from './components/TodaysStats';
import Genres from './components/Genre/Genres';

export const metadata: Metadata = {
  title: 'MusicMe | Discover',
  description:
    'Discover trending music for this week based on whats popular on the platform. Find new music based on your music taste. Explore new genres and find new artists to listen to.',
};

export default function Discover() {
  return (
    <>
      <Navbar />
      <div className="flex flex-col p-6 gap-10">
        <DiscoverSection sectionTitle="Todays Stats">
            <TodaysStats />
        </DiscoverSection>
        <DiscoverSection sectionTitle="Genres">
          <Genres />    
        </DiscoverSection>
        <DiscoverSection sectionTitle="New Releases">
          <>This section is coming soon!</>
        </DiscoverSection>
      </div>
    </>
  );
}
