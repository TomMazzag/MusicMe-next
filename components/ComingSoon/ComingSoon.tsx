import { NAV_BAR_HEIGHT } from '@MusicMe/lib/constants';
import { Navbar } from '../Navbar/Navbar';

export const ComingSoon = () => {
  return (
    <>
      <Navbar />
      <div className="flex flex-col text-center justify-center" style={{ height: `calc(100vh - ${NAV_BAR_HEIGHT}px)` }}>
        <h1 className="text-5xl mb-28 font-semibold">This page is coming soon</h1>
        <p className="text-xl">
          Go back to the
          <a href="/account" className="text-accent">
            &nbsp;homepage&nbsp;
          </a>
          or checkout some of the other pages on the navbar
        </p>
      </div>
    </>
  );
};
