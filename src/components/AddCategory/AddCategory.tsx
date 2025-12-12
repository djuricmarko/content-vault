'use client';

import { useActionState, useEffect, useRef } from "react";
import { createCategory } from "./actions";
import styles from './add-category.module.css';
import { Dialog } from "@/components/Dialog";

export function AddCategory() {
  const [state, formAction, isPending] = useActionState(createCategory, { error: '' });
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (formRef.current && !state.error) {
      formRef.current.reset();
    }
  }, [state.error]);

  return (
    <Dialog
      trigger="Create new category"
      title="Add category"
      description="Create"
    >
      <form action={formAction}>
        <div className={styles.categoryInput}>
          <input
            type="text"
            name="name"
            placeholder="Enter category name"
            required
          />
          <button
            type="submit"
            disabled={isPending}
          >
            {isPending ? 'Adding...' : 'Add category'}
          </button>
          {state?.error && <p>{state.error}</p>}
        </div>
      </form>
    </Dialog>
  );
}
