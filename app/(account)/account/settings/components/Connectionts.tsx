import { ScaleLoader } from 'react-spinners';
import { UserDetails } from './ClientSideContainer';

export const Connections = ({ user, isUserLoaded }: UserDetails) => {
  if (!isUserLoaded) {
    return <ScaleLoader color={'#22c55e'} />;
  }
  if ((isUserLoaded && user === null) || user === undefined) {
    return <div>Error loading account details, please try again later.</div>;
  }
  if (user === null || user === undefined) {
    return <div>Error loading account details, please try again later.</div>;
  }

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold mb-4">Connections</h1>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-4">
          <div className="flex justify-between w-full">
            <h2 className="text-md">Spotify</h2>
            <i className="fa-brands fa-spotify fa-2xl px-2"></i>
          </div>
          <button className="btn btn-primary">Connect your Spotify account</button>
        </div>
      </div>
    </div>
  );
};
