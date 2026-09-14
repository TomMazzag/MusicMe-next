import { Navbar } from '@MusicMe/components/Navbar/Navbar';
import { StatsTile } from '@MusicMe/components/Account/StatTile';
import { authenticatedRequest } from '@MusicMe/lib/backend';
import { BACKEND_URL_SERVER } from '@MusicMe/lib/util';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Admin Stats',
};

interface PlatformStats {
  totalArtists: number;
  totalSongs: number;
  totalUsers: number;
  totalLikedSongs: number;
}

async function getPlatformStats(): Promise<PlatformStats> {
  const response = await authenticatedRequest(`${BACKEND_URL_SERVER}/admin/stats`, { method: 'GET' });

  if (!response.ok) {
    throw new Error('Failed to fetch platform stats');
  }

  return response.json();
}

export default async function AdminStatsPage() {
  let stats: PlatformStats;

  try {
    stats = await getPlatformStats();
  } catch {
    redirect('/');
  }

  return (
    <>
      <Navbar />
      <div className="h-full flex flex-col items-center justify-center gap-8 my-4 px-4">
        <h1 className="text-3xl font-bold">Platform Stats</h1>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-8 w-full max-w-4xl">
          <StatsTile heading="Total Artists" statValue={String(stats.totalArtists)} />
          <StatsTile heading="Total Songs" statValue={String(stats.totalSongs)} />
          <StatsTile heading="Total Users" statValue={String(stats.totalUsers)} />
          <StatsTile heading="Liked Songs" statValue={String(stats.totalLikedSongs)} />
        </div>
      </div>
    </>
  );
}
