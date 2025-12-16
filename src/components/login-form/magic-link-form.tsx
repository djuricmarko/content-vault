'use client';

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import styles from "./login-form.module.css";
import { z } from "zod";

const emailSchema = z.email("Invalid email address.");

export function MagicLinkForm() {
  const supabase = createClient();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState(false);

  function emailChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value);
  }

  async function handleLogin() {
    setIsLoading(true);
    setErrorMessage("");

    const parsedEmail = emailSchema.safeParse(email);

    if (!parsedEmail.success) {
      setErrorMessage(parsedEmail.error.issues[0].message);
      setIsLoading(false);
      return;
    }

    try {
      await supabase.auth.signInWithOtp({
        email: parsedEmail.data,
        options: {
          shouldCreateUser: true,
          emailRedirectTo: `${location.origin}/dashboard`,
        },
      });
      setSuccess(true);
    } catch (error: unknown) {
      setErrorMessage(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form action={handleLogin} className={styles.inputGroup}>
      <label htmlFor="email" className={styles.label}>Email</label>
      <input
        id="email"
        type="email"
        placeholder="name@example.com"
        onChange={emailChangeHandler}
        className={styles.input}
      />
      <button
        type="submit"
        className={styles.primaryButton}
      >
        {isLoading ? 'Signing in...' : 'Continue'}
      </button>
      {success && (
        <div className={styles.success}>
          <p>
            We have sent a sign-in link to <br />
            <strong>{email}</strong>
          </p>
          <p>Don&#39;t see it? Check your spam folder</p>
        </div>
      )}
      {errorMessage && (
        <p className={styles.error}>{errorMessage}</p>
      )}
    </form>
  );
}
