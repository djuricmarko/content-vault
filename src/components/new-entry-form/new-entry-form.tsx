'use client';

import { useActionState, useState } from "react";
import dynamic from "next/dynamic";
import { CategoryDropdown } from "./category-dropdown";
import { Category } from "@/lib/drizzle/schema";
import { createEntry } from "./actions";
import styles from './new-entry-form.module.css';

const EntryEditor = dynamic(() => import('../entry-editor/entry-editor'), {
  ssr: false,
  loading: () => <div>Loading editor...</div>
});

interface Props {
  initialCategories: Category[];
  selectedCategory?: string
}

export function NewEntryForm({ initialCategories, selectedCategory }: Props) {
  const [state, formAction, isPending] = useActionState(createEntry, { success: false, error: '' });
  const [richText, setRichText] = useState<string>('');

  console.log(selectedCategory);
  function entryEditorHandler(newContent: string) {
    setRichText(newContent);
  }

  return (
    <div className={styles.formContainer}>
      <form action={formAction}>
        <div className={styles.top}>
          <div className={styles.left}>
            <input type="text" name="title" placeholder="Enter the entry title" />
            <CategoryDropdown initialCategories={initialCategories} defaultValue={selectedCategory} />
          </div>
          <button
            type="submit"
            className={styles.button}
            disabled={isPending}
          >
            {isPending ? 'Saving...' : 'Save'}
          </button>
        </div>
        <EntryEditor
          content={richText}
          onChange={entryEditorHandler}
        />
        <input
          type="hidden"
          name="content"
          value={richText}
        />
      </form>
      {state?.error && <p className={styles.error}>{state.error}</p>}
    </div>
  );
}
