"use client";

import { useActionState } from "react";
import { Input } from "@/components/input";
import { updateProfile } from "@/actions/updateProfile";
import styles from "./complete-profile.module.css";

interface FormState {
  success: boolean;
  error?: string;
}

const initialState: FormState = {
  success: false,
};

export function CompleteProfileForm() {
  const [state, formAction, isPending] = useActionState<FormState, FormData>(
    updateProfile,
    initialState
  );

  if (state.success) {
    return (
      <div className={styles.success}>
        Profile saved! Redirecting to dashboard...
      </div>
    );
  }

  return (
    <form action={formAction} className={styles.inputGroup}>
      <div className={styles.row}>
        <div className={styles.field}>
          <label htmlFor="name" className={styles.label}>
            Name
          </label>
          <Input id="name" name="name" type="text" required />
        </div>
        <div className={styles.field}>
          <label htmlFor="surname" className={styles.label}>
            Surname
          </label>
          <Input id="surname" name="surname" type="text" required />
        </div>
      </div>
      <button type="submit" className={styles.button} disabled={isPending}>
        {isPending ? "Saving..." : "Continue"}
      </button>
      {state.error && <p className={styles.error}>{state.error}</p>}
    </form>
  );
}
