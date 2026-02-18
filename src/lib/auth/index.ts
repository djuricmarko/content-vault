import { createClient } from '@/lib/supabase/server';
import { User } from '@supabase/supabase-js';

type AuthResult =
  | { user: User; error: null }
  | { user: null; error: string };

/**
 * Verifies the current user is authenticated.
 * Call this BEFORE any database operations in server actions.
 */
export async function getAuthenticatedUser(): Promise<AuthResult> {
  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser();

  if (error || !user) {
    return { user: null, error: 'Unauthorized' };
  }

  return { user, error: null };
}
