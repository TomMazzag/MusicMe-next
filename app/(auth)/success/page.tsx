import { generateSpotifyToken } from '@MusicMe/lib/spotify';
import { PropagateLoader } from 'react-spinners';

export default async function Success({ 
  searchParams 
}: { 
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const params = await searchParams;
  const code = params.code as string;
  const state = params.state as string;
  if (!code || !state) {
    throw new Error('Error getting spotify code');
  }

  const spotifyToken = await generateSpotifyToken(code, state);

  return (
    <div className="success-redirect flex flex-col justify-center items-center h-screen text-center gap-12">
      <h1>Welcome to social media for music!</h1>

      <p>Loading...</p>

      {code && <p>Code: {code}</p>}
      {state && <p>State: {state}</p>}

      <PropagateLoader color="lightgreen" style={{ display: 'inherit', position: 'relative', left: '-7px' }} />
    </div>
  );
}
