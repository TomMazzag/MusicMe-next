'use client';

import { Dispatch, SetStateAction, useState } from 'react';
import InputField from '@MusicMe/components/Input/InputField';
import { faCalendar, faIdBadge, faImage, faPlus, faRankingStar, faUser } from '@fortawesome/free-solid-svg-icons';
import { useQuery } from '@tanstack/react-query';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from '@MusicMe/components/Buttons';

interface ArtistsInput {
  id: string;
  position?: number;
}

interface FormData {
  selectedGenres: string[];
  name: string;
  image: string;
  releaseDate: string | null;
  artists: ArtistsInput[];
  platforms?: { spotifyId?: string };
}

const initialFormData: FormData = {
  selectedGenres: [],
  name: '',
  image: '',
  releaseDate: null,
  artists: [{ id: '' }],
};

export default function NewSong() {
  const [songSearch, setSongSearch] = useState('');
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data: songs } = useQuery({
    queryKey: ['artist', songSearch],
    queryFn: () =>
      fetch(`/api/spotify/search?query=${songSearch}&type=track`).then(async (data) => {
        if (!data.ok) {
          return [];
        }
        const result = await data.json();
        console.log(result);
        return result.items as SpotifyApi.TrackObjectFull[];
      }),
    staleTime: 1000 * 60 * 60 * 24,
  });

  async function handleSubmit() {
    setIsSubmitting(true);
    const { name, image, releaseDate, selectedGenres, artists, platforms } = formData;
    await fetch('/api/admin/song/new', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        imageUrl: image,
        releaseDate,
        genres: selectedGenres,
        artistsIds: artists
          .filter((artist) => artist.id.trim() !== '')
          .map((artist) => ({ id: artist.id, position: artist.position })),
        platforms,
      }),
    });
    setIsSubmitting(false);
    setFormData(initialFormData);
    setSongSearch('');
  }

  function addArtist() {
    setFormData((current) => ({
      ...current,
      artists: [...current.artists, { id: '' }],
    }));
  }

  return (
    <>
      <div className="absolute left-10 top-50">
        Song Search (Spotify):
        <InputField label="Name" icon={faUser} currentState={songSearch} setState={(name) => setSongSearch(name)} />
        {songs && (
          <div className="flex flex-col gap-2 mt-4 overflow-y-scroll max-h-[54vh]">
            {songs.map((song) => (
              <div
                key={song.id}
                className="flex items-center gap-2 mb-2 cursor-pointer"
                onClick={() => {
                  setFormData({
                    ...formData,
                    name: song.name,
                    image: song.album.images[0]?.url || '',
                    platforms: { spotifyId: song.id },
                  });
                }}
              >
                {song.album.images[0] && (
                  <img src={song.album.images[0].url} alt={song.name} className="w-10 h-10 object-cover rounded-full" />
                )}
                <span>{song.name}</span>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="flex flex-col gap-2 w-1/4">
        <InputField
          label="Name"
          icon={faUser}
          currentState={formData.name}
          setState={(name) => setFormData({ ...formData, name })}
        />
        <InputField
          label="Image"
          icon={faImage}
          currentState={formData.image}
          setState={(image) => setFormData({ ...formData, image })}
        />
        {formData.artists.map((_, index) => (
          <ArtistInputField
            key={index}
            index={index}
            formData={formData}
            setFormData={setFormData}
            onAddArtist={addArtist}
          />
        ))}
        <label className="label">
          <FontAwesomeIcon icon={faCalendar} className="mr-2" />
          <span className="label-text">Release date</span>
        </label>
        <input
          type="date"
          onChange={(e) => setFormData({ ...formData, releaseDate: e.target.value })}
          className="input input-bordered w-full border-accent"
        />
      </div>
      <Button onClick={handleSubmit} disabled={isSubmitting}>
        Create Song
      </Button>
    </>
  );
}

interface ArtistInputFieldProps {
  formData: FormData;
  setFormData: Dispatch<SetStateAction<FormData>>;
  index: number;
  onAddArtist: () => void;
}

export function ArtistInputField({ formData, setFormData, index, onAddArtist }: ArtistInputFieldProps) {
  const artist = formData.artists[index];
  const isLast = index === formData.artists.length - 1;

  function updateArtist(patch: Partial<ArtistsInput>) {
    setFormData((current) => {
      const artists = [...current.artists];
      artists[index] = { ...artists[index], ...patch };
      return { ...current, artists };
    });
  }

  return (
    <div className="relative">
      <div className="grid grid-cols-[80%_20%] gap-2">
        <InputField
          label="Artist id"
          icon={faIdBadge}
          currentState={artist?.id || ''}
          setState={(id) => updateArtist({ id })}
        />
        <InputField
          label="Pos"
          icon={faRankingStar}
          type="number"
          currentState={artist?.position != null ? String(artist.position) : ''}
          setState={(value) => {
            const position = value === '' ? undefined : Number(value);
            if (position !== undefined && Number.isNaN(position)) return;
            updateArtist({ position });
          }}
        />
      </div>
      {isLast && (
        <Button onClick={onAddArtist} className="absolute bottom-0 left-full ml-4 px-2 py-1.5 border">
          <FontAwesomeIcon icon={faPlus} />
        </Button>
      )}
    </div>
  );
}
