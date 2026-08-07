'use client';

import { LoginButton } from '@MusicMe/components/Login/LoginButton';
import { useAuth } from '@clerk/nextjs';
import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect } from 'react';
import { PropagateLoader } from 'react-spinners';

function SuccessContent() {
  const searchParams = useSearchParams();
  const code = searchParams.get('code');
  const state = searchParams.get('state');
  const { isLoaded: isAuthLoaded, isSignedIn } = useAuth();

  useEffect(() => {
    if (!code || !state || !isAuthLoaded) {
      return;
    }

    async function handleCallback() {
      try {
        const response = await fetch(`/api/auth/callback?code=${code}&state=${state}`, {
          credentials: 'include',
        });

        if (response.status === 200) {
          window.location.href = isSignedIn ? '/account/settings?tab=connections' : '/account';
          return;
        }

        console.error('Spotify callback failed', response.status);
      } catch (err) {
        console.error('Fetch error:', err);
      }
    }

    handleCallback();
  }, [code, state, isAuthLoaded, isSignedIn]);

  if (!code || !state) {
    return (
      <div className="success-redirect flex flex-col justify-center items-center h-screen text-center gap-12">
        <h1>Error</h1>
        <p>Missing code or state parameters.</p>

        <p>Please try again.</p>
        <LoginButton />
      </div>
    );
  }

  return (
    <div className="success-redirect flex flex-col justify-center items-center h-screen text-center gap-12">
      <h1>{isSignedIn ? 'Connecting Spotify...' : 'Welcome to social media for music!'}</h1>
      <p>Redirecting...</p>
      <PropagateLoader color="lightgreen" style={{ display: 'inherit', position: 'relative', left: '-7px' }} />
    </div>
  );
}

export default function Success() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SuccessContent />
    </Suspense>
  );
}
