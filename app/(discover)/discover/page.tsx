import { Navbar } from '@MusicMe/components/Navbar/Navbar';
import { Metadata } from 'next';
import { DiscoverSection } from './components/DiscoverSection';
import TodaysStats from './components/TodaysStats';
import Genres from './components/Genre/Genres';
import NewReleases from './components/NewReleases';

export const metadata: Metadata = {
  title: 'MusicMe | Discover',
  description:
    'Discover trending music for this week based on whats popular on the platform. Find new music based on your music taste. Explore new genres and find new artists to listen to.',
  alternates: {
    canonical: '/discover',
  },
};

export default function Discover() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WegPage',
            name: 'MusicMe Discover',
            url: 'https://music-me-next.vercel.app/discover',
            isPartOf: {
              '@type': 'WebSite',
              name: 'MusicMe',
              url: 'https://music-me-next.vercel.app/',
            },
          }),
        }}
      />
      <Navbar />
      <div className="flex flex-col p-6 gap-10">
        <DiscoverSection sectionTitle="Todays Stats">
          <TodaysStats />
        </DiscoverSection>
        <DiscoverSection sectionTitle="Genres">
          <Genres />
        </DiscoverSection>
        <DiscoverSection sectionTitle="New Releases">
          <NewReleases />
        </DiscoverSection>
      </div>
    </>
  );
}
