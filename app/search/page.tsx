import { Metadata } from 'next';
import SearchClientSide from './components/SearchClientSide';
import { Navbar } from '@MusicMe/components/Navbar/Navbar';

export const metadata: Metadata = {
  title: 'MusicMe | Search',
  description:
    'Search for new tracks, follow friends or find new Artists!',
};

export default function SearchPage() {
  return (
    <>
      <Navbar />
      <div className='flex flex-col items-center gap-8 py-8'>
        <SearchClientSide />
      </div>
    </>
  );
}
