'use client';

import Image from "next/image";
import { createClient } from "@/lib/supabase/client";
import styles from './login-form.module.css';

export function LoginForm() {
  async function handleLogin() {
    const supabase = createClient();

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
      console.error('Error logging in:', error.message);
    }
  }

  return (
    <button
      type="button"
      onClick={handleLogin}
      className={styles.googleBtn}
    >
      <div className={styles.iconWrapper}>
        <Image
          src="https://authjs.dev/img/providers/google.svg"
          alt="Google logo"
          width={20}
          height={20}
        />
      </div>
      <span className={styles.btnText}>Continue with Google</span>
    </button>
  );
}
