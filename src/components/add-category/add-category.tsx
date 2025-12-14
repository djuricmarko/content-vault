'use client';

import { useActionState, useEffect, useRef } from "react";
import { createCategory } from "./createCategory";
import { Dialog } from "@/components/dialog";
import styles from './add-category.module.css';

export function AddCategory() {
  const [state, formAction, isPending] = useActionState(createCategory, { success: false, error: '' });
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (formRef.current && !state.error) {
      formRef.current.reset();
    }
  }, [state]);

  return (
    <Dialog
      trigger="Create new category"
      icon="plus"
      title="Create new category"
      description="Enter the name of the new category"
    >
      <form action={formAction} className={styles.form}>
        <div className={styles.categoryInput}>
          <input
            type="text"
            name="name"
            placeholder="Enter category name"
          />
          {state?.error && <p className={styles.error}>{state.error}</p>}
        </div>
        <button
          type="submit"
          className={styles.button}
          disabled={isPending}
        >
          {isPending ? 'Saving...' : 'Save'}
        </button>
      </form>
    </Dialog>
  );
}
