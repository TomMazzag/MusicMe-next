'use client';

import { useEffect, useState } from 'react';
import { ScaleLoader } from 'react-spinners';
import { UserDetails } from './ClientSideContainer';
import { BACKEND_URL } from '@MusicMe/lib/util';

type SpotifyConnectionStatus =
  | { status: 'loading' }
  | { status: 'connected'; displayName: string }
  | { status: 'disconnected' };

export const Connections = ({ user, isUserLoaded }: UserDetails) => {
  const [spotifyStatus, setSpotifyStatus] = useState<SpotifyConnectionStatus>({ status: 'loading' });
  const [isDisconnecting, setIsDisconnecting] = useState(false);

  useEffect(() => {
    if (!isUserLoaded || !user) {
      return;
    }

    let cancelled = false;

    async function checkSpotifyConnection() {
      try {
        const response = await fetch('/api/user/spotify/account', { credentials: 'include' });
        if (!response.ok) {
          if (!cancelled) {
            setSpotifyStatus({ status: 'disconnected' });
          }
          return;
        }

        const data = (await response.json()) as { display_name?: string; id?: string };
        if (!cancelled) {
          setSpotifyStatus({
            status: 'connected',
            displayName: data.display_name || data.id || 'Spotify account',
          });
        }
      } catch {
        if (!cancelled) {
          setSpotifyStatus({ status: 'disconnected' });
        }
      }
    }

    checkSpotifyConnection();

    return () => {
      cancelled = true;
    };
  }, [isUserLoaded, user]);

  if (!isUserLoaded) {
    return <ScaleLoader color={'#22c55e'} />;
  }
  if ((isUserLoaded && user === null) || user === undefined) {
    return <div>Error loading account details, please try again later.</div>;
  }
  if (user === null || user === undefined) {
    return <div>Error loading account details, please try again later.</div>;
  }

  const authorize = () => {
    window.location.href = `${BACKEND_URL}/auth/login`;
  };

  const disconnect = async () => {
    setIsDisconnecting(true);
    try {
      const response = await fetch('/api/auth/spotify/disconnect', {
        method: 'POST',
        credentials: 'include',
      });
      if (response.ok) {
        setSpotifyStatus({ status: 'disconnected' });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsDisconnecting(false);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold mb-4">Connections</h1>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-4">
          <div className="flex justify-between w-full items-center">
            <h2 className="text-md">Spotify</h2>
            <i className="fa-brands fa-spotify fa-2xl px-2"></i>
          </div>

          {spotifyStatus.status === 'connected' && (
            <>
              <p className="text-sm text-base-content/70">
                Connected as <span className="font-medium text-base-content">{spotifyStatus.displayName}</span>
              </p>
              <button
                className="btn btn-outline btn-error"
                onClick={disconnect}
                disabled={isDisconnecting}
              >
                {isDisconnecting ? 'Disconnecting...' : 'Disconnect Spotify'}
              </button>
            </>
          )}

          {spotifyStatus.status === 'disconnected' && (
            <button className="btn btn-primary" onClick={authorize} onTouchStart={authorize}>
              Connect your Spotify account
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
