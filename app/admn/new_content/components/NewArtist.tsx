'use client';

import { Genre } from '@MusicMe/types/Genre';
import GenreSelector from './GenreSelector';
import { useState } from 'react';
import InputField from '@MusicMe/components/Input/InputField';
import { faCalendar, faImage, faUser } from '@fortawesome/free-solid-svg-icons';
import { useQuery } from '@tanstack/react-query';

interface Props {
  genres: Genre[] | undefined;
}

interface FormData {
  selectedGenres: string[];
  name: string;
  image: string;
  yearFounded: number | null;
}

export default function NewArtist({ genres }: Props) {
  const [artistSearch, setArtistSearch] = useState('');
  const [formData, setFormData] = useState<FormData>({
    selectedGenres: [],
    name: '',
    image: '',
    yearFounded: null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data: atrists } = useQuery({
    queryKey: ['artist', artistSearch],
    queryFn: () =>
      fetch(`/api/artist/search?query=${artistSearch}`).then(async (data) => {
        if (!data.ok) {
          return [];
        }
        const result = await data.json();
        console.log(result);
        return result.items as SpotifyApi.ArtistObjectFull[];
      }),
    staleTime: 1000 * 60 * 60 * 24,
  });

  function toggleGenre(genreKey: string) {
    if (formData.selectedGenres.includes(genreKey)) {
      setFormData({ ...formData, selectedGenres: formData.selectedGenres.filter((key) => key !== genreKey) });
    } else {
      setFormData({ ...formData, selectedGenres: [...formData.selectedGenres, genreKey] });
    }
  }

  async function handleSubmit() {
    setIsSubmitting(true);
    await fetch('/api/admin/artist/new', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: formData.name,
        imageUrl: formData.image,
        yearFounded: formData.yearFounded,
        genres: formData.selectedGenres,
      }),
    });
    setIsSubmitting(false);
    setFormData({ selectedGenres: [], name: '', image: '', yearFounded: null });
    setArtistSearch('');
  }

  return (
    <>
      <div className="absolute left-10 top-50">
        Artist Search (Spotify):
        <InputField label="Name" icon={faUser} currentState={artistSearch} setState={(name) => setArtistSearch(name)} />
        {atrists && (
          <div className="flex flex-col gap-2 mt-4 overflow-y-scroll max-h-[54vh]">
            {atrists.map((artist) => (
              <div
                key={artist.id}
                className="flex items-center gap-2 mb-2 cursor-pointer"
                onClick={() => {
                  setFormData({
                    ...formData,
                    name: artist.name,
                    image: artist.images[0]?.url || '',
                  });
                }}
              >
                {artist.images[0] && (
                  <img src={artist.images[0].url} alt={artist.name} className="w-10 h-10 object-cover rounded-full" />
                )}
                <span>{artist.name}</span>
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
        <InputField
          label="Year Founded"
          icon={faCalendar}
          currentState={String(formData.yearFounded || '')}
          setState={(yearFounded) =>
            setFormData({ ...formData, yearFounded: yearFounded ? parseInt(yearFounded) : null })
          }
        />
      </div>
      <GenreSelector genres={genres} toggleGenre={toggleGenre} formData={formData} />
      <button
        className="border border-accent px-4 py-2 rounded-md hover:bg-accent transition-colors"
        onClick={handleSubmit}
        disabled={isSubmitting}
      >
        Create Artist
      </button>
    </>
  );
}
