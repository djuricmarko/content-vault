import { AuthError } from './require-auth';

interface FormState {
  error: string | undefined;
}

export async function handleServerAction<T>(
  action: () => Promise<T>,
  errorMessage: string = 'An error occurred. Please try again.'
): Promise<{ success: boolean; data?: T; error?: string }> {
  try {
    const data = await action();
    return { success: true, data };
  } catch (error) {
    console.error('Server Action Error:', error);

    if (error instanceof AuthError) {
      return { success: false, error: error.message };
    }

    if (error instanceof Error) {
      return { success: false, error: error.message };
    }

    return { success: false, error: errorMessage };
  }
}

export function toFormState(result: { success: boolean; error?: string }): FormState {
  return { error: result.error };
}
