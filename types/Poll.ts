import z from "zod";

const pollSelectionTypeEnum = z.enum(['single', 'multiple', 'max_n']);
const pollShowResultsEnum = z.enum(['always', 'after_vote', 'after_close']);

const pollOptionSchema = z.object({
  songId: z.uuidv7('Song ID missing, please select a valid song'),
  position: z.number(),
  name: z.string().optional(),
});

export const createPollSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  selectionType: pollSelectionTypeEnum.default('single'),
  maxSelections: z.number().optional(),
  startsAt: z.date().default(new Date()),
  endsAt: z.date().optional(),
  showResults: pollShowResultsEnum.default('always'),
  options: z.array(pollOptionSchema).nonempty('At least one option is required'),
});

export type CreatePollValues = z.infer<typeof createPollSchema>;
