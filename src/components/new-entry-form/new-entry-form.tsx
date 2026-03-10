'use client';

import { useActionState, useState } from "react";
import dynamic from "next/dynamic";
import { CategoryDropdown } from "@/components/category-dropdown";
import { Category } from "@/lib/drizzle/schema";
import { createEntry } from "@/actions/createEntry";
import { Input } from "@/components/input";
import styles from './new-entry-form.module.css';

const EntryEditor = dynamic(() => import('../entry-editor/entry-editor'), {
  ssr: false,
  loading: () => <div>Loading editor...</div>
});

interface Props {
  initialCategories: Category[];
  selectedCategory?: string;
}

export function NewEntryForm({ initialCategories, selectedCategory }: Props) {
  const [state, formAction] = useActionState(createEntry, { success: false, error: '' });
  const [richText, setRichText] = useState<string>('');

  function entryEditorHandler(newContent: string) {
    setRichText(newContent);
  }

  return (
    <div className={styles.formContainer}>
      <form id="new-entry" action={formAction}>
        <EntryEditor
          content={richText}
          onChange={entryEditorHandler}
          toolbar
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
