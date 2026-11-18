import type { FieldPath, FieldValues, UseFormSetError } from 'react-hook-form';

/** Matches backend Zod error response */
export type ApiZodIssue = {
  field: string;
  message: string;
  code: string;
};

export type ApiZodErrorResponse = {
  error: 'ZodError';
  success: false;
  errors: ApiZodIssue[];
};

export function isApiZodErrorResponse(body: unknown): body is ApiZodErrorResponse {
  if (typeof body !== 'object' || body === null) return false;
  const record = body as Record<string, unknown>;
  return record.error === 'ZodError' && Array.isArray(record.errors);
}

export function applyApiZodErrors<TFieldValues extends FieldValues>(
  issues: ApiZodIssue[],
  setError: UseFormSetError<TFieldValues>,
): void {
  for (const issue of issues) {
    setError(issue.field as FieldPath<TFieldValues>, {
      type: 'server',
      message: issue.message,
    });
  }
}

export type ApplyApiErrorsResult = 'zod' | 'none';

/**
 * Parse a failed fetch response body and apply field errors when the API returns ZodError.
 */
export async function applyApiErrorsFromResponse<TFieldValues extends FieldValues>(
  response: Response,
  setError: UseFormSetError<TFieldValues>,
): Promise<ApplyApiErrorsResult> {
  let body: unknown;
  try {
    body = await response.json();
  } catch {
    return 'none';
  }

  if (isApiZodErrorResponse(body)) {
    applyApiZodErrors(body.errors, setError);
    return 'zod';
  }

  return 'none';
}