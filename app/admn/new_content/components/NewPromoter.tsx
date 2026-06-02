'use client';

import { Genre } from '@MusicMe/types/Genre';
import GenreSelector from './GenreSelector';
import { useState } from 'react';
import InputField from '@MusicMe/components/Input/InputField';
import { faCalendar, faImage, faLink, faUser } from '@fortawesome/free-solid-svg-icons';
import { useMutation } from '@tanstack/react-query';

interface Props {
  genres: Genre[] | undefined;
}

interface FormData {
  selectedGenres: string[];
  name: string;
  image: string;
  websiteUrl: string;
  description: string;
  yearFounded: number | null;
}

type ApiValidationError = {
  field: string;
  message: string;
  code: string;
};

type ApiError = {
  message: string;
  errors?: ApiValidationError[];
  status: number;
};

export default function NewPromoter({ genres }: Props) {
  const [formData, setFormData] = useState<FormData>({
    selectedGenres: [],
    name: '',
    image: '',
    websiteUrl: '',
    description: '',
    yearFounded: null,
  });

  function toggleGenre(genreKey: string) {
    if (formData.selectedGenres.includes(genreKey)) {
      setFormData({ ...formData, selectedGenres: formData.selectedGenres.filter((key) => key !== genreKey) });
    } else {
      setFormData({ ...formData, selectedGenres: [...formData.selectedGenres, genreKey] });
    }
  }

  const createPromoterMutation = useMutation<unknown, ApiError>({
    mutationFn: async () => {
      const res = await fetch('/api/admin/promoter/new', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          imageUrl: formData.image,
          yearFounded: formData.yearFounded,
          genres: formData.selectedGenres,
          websiteUrl: formData.websiteUrl
        }),
      });

      if (!res.ok) {
        const body = await res.json();
        throw Object.assign(new Error(body.message), {
          errors: body.errors,
          status: res.status,
        } satisfies Omit<ApiError, 'message'>);
      }

      return res.json();
    },
  });

  async function handleSubmit() {
    createPromoterMutation.mutate();
    setFormData({ selectedGenres: [], name: '', image: '', websiteUrl: '', description: '', yearFounded: null });
  }

  return (
    <>
      {createPromoterMutation.isError && (
        <div className='flex flex-col gap-2 text-center'>
          <p className="text-red-500">An error occurred while creating the promoter.</p>
          {createPromoterMutation.isError &&
            createPromoterMutation.error?.errors?.map((err) => (
              <p key={err.field} className="text-red-500">
                {err.field}: {err.message}
              </p>
            ))}
        </div>
      )}
      {createPromoterMutation.isSuccess && <p className="text-green-500">Success creating promoter</p>}
      <div className="flex flex-col gap-2 w-1/4">
        <InputField
          label="Name"
          icon={faUser}
          currentState={formData.name}
          setState={(name) => setFormData({ ...formData, name })}
        />
        <InputField
          label="Website URL"
          icon={faLink}
          currentState={formData.websiteUrl}
          setState={(websiteUrl) => setFormData({ ...formData, websiteUrl })}
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
        className="border border-accent px-4 py-2 rounded-md hover:bg-accent transition-colors disabled:cursor-not-allowed disabled:opacity-50"
        onClick={handleSubmit}
        disabled={createPromoterMutation.isPending || formData.selectedGenres.length === 0}
      >
        Create Promoter
      </button>
    </>
  );
}
