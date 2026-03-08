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
    if (code && state) {
      const redirectUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/callback?code=${code}&state=${state}`;
      window.location.href = redirectUrl;
    }
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