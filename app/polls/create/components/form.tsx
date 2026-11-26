'use client';

import { Button } from '@MusicMe/components/Buttons';
import { FormInputField } from '@MusicMe/components/Form';
import FormSelectField from '@MusicMe/components/Form/FormSelectField';
import { useZodForm } from '@MusicMe/lib/forms';
import { createPollSchema, CreatePollValues } from '@MusicMe/types/Poll';
import OptionsField from './OptionsField';

const defaultValues: CreatePollValues = {
  title: '',
  description: '',
  selectionType: 'single',
  maxSelections: undefined,
  startsAt: new Date(),
  endsAt: undefined,
  showResults: 'always',
  options: [{songId: '', position: 0}],
};

export default function CreatePollForm() {
  const {
    register,
    handleSubmit,
    setValue,
    control,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useZodForm({
    schema: createPollSchema,
    defaultValues,
    mode: 'onSubmit',
  });

  const onValidSubmit = handleSubmit(async (values) => {
    await new Promise((r) => setTimeout(r, 400));
  });

  return (
    <form
      onSubmit={onValidSubmit}
      className="card bg-base-200 border border-base-300 p-6 flex flex-col gap-4 w-[50vw]"
      noValidate
    >
      <FormInputField
        name="title"
        label="Title"
        placeholder="What is this poll about - e.g. Who is the best artist out of these choices?"
        register={register}
        errors={errors}
      />
      <FormInputField
        name="description"
        label="Description"
        placeholder="Description for your poll - e.g. Best artists of 2026"
        register={register}
        errors={errors}
      />

      <FormSelectField
        name="selectionType"
        label="Selection Type"
        register={register}
        errors={errors}
        options={[
          { label: 'Single answer', value: 'single' },
          { label: 'Multiple answers', value: 'multiple' },
          { label: 'Maximum answers', value: 'max_n' },
        ]}
      />

      {watch('selectionType') === 'max_n' && (
        <FormInputField
          name="maxSelections"
          label="Maximum answers"
          placeholder="Maximum number of choices a user can select"
          register={register}
          errors={errors}
        />
      )}

      <FormSelectField
        name="showResults"
        label="Show Results"
        register={register}
        errors={errors}
        options={[
          { label: 'Always', value: 'always' },
          { label: 'After vote', value: 'after_vote' },
          { label: 'After poll closes', value: 'after_close' },
        ]}
      />

      <OptionsField register={register} errors={errors} control={control} setValue={setValue} />

      <div>Start date</div>
      <div>End date</div>

      <div className="flex flex-wrap gap-2 pt-2">
        <Button type="submit" disabled={isSubmitting} onClick={() => reset()} variant="subdued">
          Save as draft
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Creating poll...' : 'Create poll'}
        </Button>
      </div>
    </form>
  );
}
