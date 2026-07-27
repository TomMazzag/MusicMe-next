'use client';

import { ScaleLoader } from 'react-spinners';

export default function FullScreenLoader() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
      <ScaleLoader color={'#22c55e'} />
    </div>
  );
}
