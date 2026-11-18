'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import {
  useForm,
  type DefaultValues,
  type FieldValues,
  type Resolver,
  type UseFormProps,
  type UseFormReturn,
} from 'react-hook-form';
import { z } from 'zod';

type UseZodFormProps<TOutput extends FieldValues> = Omit<UseFormProps<TOutput>, 'resolver'> & {
  /** Use `z.object({ ... })` (or another Zod 4 schema) with `z.infer<typeof schema>` for typing. */
  schema: z.ZodType<TOutput>;
  defaultValues: DefaultValues<TOutput>;
};

export function useZodForm<TOutput extends FieldValues>({
  schema,
  ...formProps
}: UseZodFormProps<TOutput>): UseFormReturn<TOutput, unknown, TOutput> {
  return useForm<TOutput, unknown, TOutput>({
    ...formProps,
    // Zod 4 schema types and @hookform/resolvers generics do not align cleanly yet; runtime is correct.
    resolver: zodResolver(schema as never) as Resolver<TOutput, unknown, TOutput>,
  });
}