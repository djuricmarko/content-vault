'use client';

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import styles from "./login-form.module.css";

export function MagicLinkForm() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState(false);

  function emailChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value);
  }

  async function handleLogin() {
    setLoading(true);
    const supabase = createClient();
    const { data, error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        shouldCreateUser: true,
        emailRedirectTo: `${location.origin}/dashboard`,
      },
    });

    if (data) {
      setLoading(false);
      setSuccess(true);
    }

    if (error) {
      setLoading(false);
      setErrorMessage(`Error logging in: ${error.message}`);
    }
  }

  return (
    <div className={styles.inputGroup}>
      <label htmlFor="email" className={styles.label}>Email</label>
      <input
        id="email"
        type="email"
        placeholder="name@example.com"
        onChange={emailChangeHandler}
        className={styles.input}
      />
      <button
        type="button"
        onClick={handleLogin}
        className={styles.primaryButton}
      >
        {loading ? 'Signing in...' : 'Continue'}
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
    </div>
  );
}
