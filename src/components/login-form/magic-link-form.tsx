'use client';

import { useActionState } from "react";
import { z } from "zod";
import { createClient } from "@/lib/supabase/client";
import { Input } from "@/components/input";
import styles from "./login-form.module.css";

const emailSchema = z.email("Invalid email address.");

interface FormState {
  error?: string;
  success?: boolean;
  email?: string;
}

async function sendMagicLink(prevState: FormState, formData: FormData): Promise<FormState> {
  const email = formData.get("email") as string;

  const parsedEmail = emailSchema.safeParse(email);

  if (!parsedEmail.success) {
    return {
      error: parsedEmail.error.issues[0].message,
      success: false,
    };
  }

  try {
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOtp({
      email: parsedEmail.data,
      options: {
        shouldCreateUser: true,
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    });

    if (error) {
      return {
        error: 'An error occurred',
        success: false,
      };
    }

    return {
      success: true,
      email: parsedEmail.data,
    };
  } catch (error: unknown) {
    return {
      error: error instanceof Error ? error.message : 'An error occurred',
      success: false,
    };
  }
}

export function MagicLinkForm() {
  const [state, formAction, isPending] = useActionState<FormState, FormData>(sendMagicLink, { success: false });

  return (
    <form action={formAction} className={styles.inputGroup}>
      <label htmlFor="email" className={styles.label}>Email</label>
      <Input
        id="email"
        name="email"
        type="email"
        placeholder="name@example.com"
      />
      <button
        type="submit"
        className={styles.primaryButton}
        disabled={isPending}
      >
        {isPending ? 'Signing in...' : 'Continue'}
      </button>
      {state.success && (
        <div className={styles.success}>
          <p>
            We have sent a sign-in link to <br />
            <strong>{state.email}</strong>
          </p>
          <p>Don&#39;t see it? Check your spam folder</p>
        </div>
      )}
      {state.error && (
        <p className={styles.error}>{state.error}</p>
      )}
    </form>
  );
}
