'use client';

import { LoginButton } from '@MusicMe/components/Login/LoginButton';
import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect } from 'react';
import { PropagateLoader } from 'react-spinners';

function SuccessContent() {
  const searchParams = useSearchParams();
  const code = searchParams.get('code');
  const state = searchParams.get('state');

  useEffect(() => {
    async function handleCallback() {
      try {
        const response = await fetch(`/api/auth/callback?code=${code}&state=${state}`, {
          credentials: 'include',
        });

        if (response.status === 308) {
          const data = await response.json();
          window.location.href = data.redirectPath;
          return;
        }

        if (response.status === 200) {
          console.log('Redirecting to account');
          window.location.href = '/account';
        }
      } catch (err) {
        console.error('Fetch error:', err);
      }
    }

    handleCallback();
  }, [code, state]);

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
      <h1>Welcome to social media for music!</h1>
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
