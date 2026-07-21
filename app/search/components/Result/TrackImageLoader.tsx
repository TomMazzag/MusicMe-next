import { useEffect, useState } from 'react';

export default function TrackImageLoader({ imageUrl, id }: { imageUrl: string; id: string }) {
  const [image, setImage] = useState<string>(imageUrl);
  useEffect(() => {
    const fetchImage = async () => {
        try {
            const image = await fetch(`https://coverartarchive.org/release/${id}/front`);
            if (image.ok) {
              setImage(image.url);
            }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (_err) {
            // Image doesnt exist, skip
        }
    };
    fetchImage();
  }, [id]);
  return <img className="h-30 w-30" src={image} alt="" />;
}
