'use client';

import { Button } from '@MusicMe/components/Buttons';
import { FormDateTimeField, FormInputField } from '@MusicMe/components/Form';
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
  options: [{ songId: '', position: 0 }],
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

  const onValidSubmit = (intent: 'create' | 'draft') =>
    handleSubmit(async (values) => {
      const isPublished = intent === 'create';
      await fetch('/api/polls/create', {
        method: 'POST',
        body: JSON.stringify({ ...values, isPublished }),
      }).then(async (res) => {
        if (res.ok) {
          const data = await res.json();
          console.log(data);
          return reset();
        }
        return res.json().then((data) => {
          throw new Error(data.error);
        });
      });
    });

  return (
    <form
      className="card bg-base-200 border border-base-300 p-6 flex flex-col gap-4 w-[50vw]"
      noValidate
      onSubmit={(e) => e.preventDefault()}
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

      <div className="grid grid-cols-2 gap-2">
        <FormDateTimeField name="startsAt" label="Start date" control={control} errors={errors} />
        <FormDateTimeField name="endsAt" label="End date (optional)" control={control} errors={errors} optional />
      </div>

      <div className="flex flex-wrap gap-2 pt-2">
        <Button type="button" disabled={isSubmitting} variant="subdued" onClick={onValidSubmit('draft')}>
          Save as draft
        </Button>
        <Button type="button" disabled={isSubmitting} onClick={onValidSubmit('create')}>
          {isSubmitting ? 'Creating poll' : 'Create poll'}
        </Button>
      </div>
    </form>
  );
}
