import BlankTrack from '@MusicMe/components/Track/BlankTrack';
import Image from 'next/image';
import { useEffect } from 'react';

export default function TrackImageLoader({
  trackKey,
  imageUrl,
  id,
  onImageLoaded,
}: {
  trackKey: string;
  imageUrl: string;
  id: string;
  onImageLoaded: (trackKey: string, url: string) => void;
}) {
  useEffect(() => {
    if (imageUrl !== '') {
      return;
    }

    const fetchImage = async () => {
      try {
        const response = await fetch(`https://coverartarchive.org/release/${id}/front`);
        if (response.ok) {
          onImageLoaded(trackKey, response.url);
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (_err) {
        // Image doesnt exist, skip
      }
    };
    fetchImage();
  }, [id, imageUrl, trackKey, onImageLoaded]);

  if (imageUrl === '') {
    return <BlankTrack className="h-30 w-30 rounded-none" />;
  }
  return <Image height={120} width={120} className="h-30 w-30" src={imageUrl} alt="" />;
}
