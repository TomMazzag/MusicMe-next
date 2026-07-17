import { Navbar } from '@MusicMe/components/Navbar/Navbar';
import AdminClientSideContent from './ClientSide';
import { Metadata } from 'next';
import { BACKEND_URL_SERVER } from '@MusicMe/lib/util';
import { Genre } from '@MusicMe/types/Genre';

export const metadata: Metadata = {
  title: 'Admin new content',
};

async function getAllGenres() {
  const response = await fetch(`${BACKEND_URL_SERVER}/genre/get_all`, { method: 'GET' });

  const data = await response.json();
  return data as { genres: Genre[] };
}

export default async function AdminNewContentPage() {
  const { genres } = await getAllGenres();

  return (
    <>
      <Navbar />
      <div className="h-full flex flex-col items-center justify-center gap-8 my-4">
        <h1 className="text-3xl font-bold">Admin New Content Page</h1>

        <AdminClientSideContent genres={genres} />
      </div>
    </>
  );
}
