'use client';

import { useActionState } from "react";
import { createCategory } from "./actions";
import styles from './add-category.module.css';

export function AddCategory() {
  const [state, formAction, isPending] = useActionState(createCategory, { error: '' });

  return (
    <form action={formAction}>
      <div className={styles.categoryInput}>
        <input
          type="text"
          name="name"
          placeholder="Enter category name"
          required
        />
        <button type="submit">{isPending ? 'Adding...' : 'Add category'}</button>
        {state?.error && <p>{state.error}</p>}
      </div>
    </form>
  );
}
