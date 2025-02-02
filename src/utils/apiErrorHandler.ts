import { toast } from 'react-toastify';

/**
 * Handles errors from API calls.
 * @param err The error caught during an API call.
 * @returns A string message describing the error.
 */
export function handleApiError(err: unknown): string {
  if (err instanceof Error) {
    toast.error('Failed to load photos.');
    return err.message;
  } else {
    toast.error('An unexpected error occurred while loading photos.');
    return String(err);
  }
}
