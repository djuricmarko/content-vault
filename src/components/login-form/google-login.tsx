'use client';

import Image from "next/image";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import styles from './login-form.module.css';

export function GoogleLogin() {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  async function handleLogin() {
    const supabase = createClient();
    setIsLoading(true);
    setErrorMessage('');

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${location.origin}/auth/callback`,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        },
      });

      if (error) {
        setErrorMessage(error.message);
      }
    } catch (error: unknown) {
      setErrorMessage(error instanceof Error ? error.message : 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={handleLogin}
        className={styles.googleBtn}
        disabled={isLoading}
      >
        <Image
          src="/google.svg"
          alt="Google logo"
          width={20}
          height={20}
        />
        Continue with Google
      </button>
      {errorMessage && (
        <div className={styles.error}>
          <p>{errorMessage}</p>
        </div>
      )}
    </>
  );
}
