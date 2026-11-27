'use client';

import { cn } from '@MusicMe/lib/styling';
import { useFieldArray, UseFormSetValue, type Control, type FieldErrors, type UseFormRegister } from 'react-hook-form';
import { getFormErrorMessage } from '@MusicMe/lib/forms/errors';
import { FormFieldError } from '@MusicMe/components/Form';
import { Button } from '@MusicMe/components/Buttons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { SongSearchModalSmall } from '@MusicMe/components/Account/Tabs/components/analytics/SongSearchModal';
import { SongData } from '@MusicMe/types/Song';
import { CreatePollValues } from '@MusicMe/types/Poll';
import { useRef } from 'react';

type Props = {
  setValue: UseFormSetValue<CreatePollValues>;
  register: UseFormRegister<CreatePollValues>;
  errors: FieldErrors<CreatePollValues>;
  control: Control<CreatePollValues>;
  disabled?: boolean;
  className?: string;
};

const MODAL_ID = 'song-search-modal';
const OPTIONS_FIELD_NAME = 'options' as const;

export default function OptionsField({ setValue, register, errors, control, disabled = false, className }: Props) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: OPTIONS_FIELD_NAME,
  });
  const errorMessage = getFormErrorMessage(errors, OPTIONS_FIELD_NAME);
  const pendingOptionIndexRef = useRef<number | null>(null);

  const addEmptyOption = () => {
    append({ songId: '', name: '', position: fields.length });
  };

  const handleInputClick = (index: number) => {
    pendingOptionIndexRef.current = index;
    const modal = document.getElementById(MODAL_ID) as HTMLDialogElement | null;
    if (!modal) {
      return console.log('Modal missing from page');
    }
    modal.showModal();
  };

  const handleSongSelected = (song: SongData) => {
    const index = pendingOptionIndexRef.current;
    if (index === null) return;
    setValue(`${OPTIONS_FIELD_NAME}.${index}.songId`, song.id, { shouldValidate: true, shouldDirty: true });
    setValue(`${OPTIONS_FIELD_NAME}.${index}.name`, song.name, { shouldValidate: true, shouldDirty: true });
    setValue(`${OPTIONS_FIELD_NAME}.${index}.position`, index, { shouldValidate: true });
    pendingOptionIndexRef.current = null;
  };

  return (
    <div className={cn('form-control w-full', className)}>
      <label className="label" htmlFor={OPTIONS_FIELD_NAME}>
        <span className="label-text">Poll Options</span>
      </label>
      <div className="flex flex-col gap-4">
        {fields.map((field, index) => (
          <div key={field.id}>
            <div className="input-group flex gap-2">
              <input
                id={`${OPTIONS_FIELD_NAME}[${index}]`}
                type="text"
                placeholder="Click here to search for a specific song"
                disabled={disabled}
                aria-invalid={errorMessage ? true : undefined}
                readOnly={true}
                className={cn('input input-bordered w-full border-accent', errorMessage && 'input-error')}
                {...register(`${OPTIONS_FIELD_NAME}.${index}.name`)}
                onClick={() => {
                  handleInputClick(index);
                }}
              />
              {index === fields.length - 1 && (
                <Button className="py-1 border bg-base-100" type="button" onClick={addEmptyOption}>
                  <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
                </Button>
              )}
              {index > 0 && (
                <Button className="py-1 border bg-base-100" type="button" onClick={() => remove(index)}>
                  <FontAwesomeIcon icon={faMinus}></FontAwesomeIcon>
                </Button>
              )}
            </div>
            <FormFieldError errors={errors} name={`${OPTIONS_FIELD_NAME}.${index}.songId`} />
          </div>
        ))}
      </div>
      <SongSearchModalSmall modalId={MODAL_ID} onSongSelected={handleSongSelected} />
    </div>
  );
}
