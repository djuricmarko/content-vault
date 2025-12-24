'use client';

import { useActionState, useState } from "react";
import dynamic from "next/dynamic";
import { Field } from '@base-ui/react/field';
import { CategoryDropdown } from "@/components/category-dropdown";
import { Category } from "@/lib/drizzle/schema";
import { createEntry } from "./actions";
import { Button } from "@/components/button";
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
  const [state, formAction, isPending] = useActionState(createEntry, { success: false, error: '' });
  const [richText, setRichText] = useState<string>('');

  function entryEditorHandler(newContent: string) {
    setRichText(newContent);
  }

  return (
    <div className={styles.formContainer}>
      <form action={formAction}>
        <div className={styles.top}>
          <div className={styles.left}>
            <Field.Root className={styles.field} name="title">
              <Field.Control placeholder="Enter the entry title" className={styles.input} />
            </Field.Root>
            <CategoryDropdown initialCategories={initialCategories} defaultValue={selectedCategory} />
          </div>
          <Button
            type="submit"
            disabled={isPending}
          >
            {isPending ? 'Saving...' : 'Save'}
          </Button>
        </div>
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
