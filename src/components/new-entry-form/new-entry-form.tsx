'use client';

import { useActionState, useState } from "react";
import dynamic from "next/dynamic";
import { CategoryDropdown } from "./category-dropdown";
import { Category } from "@/lib/drizzle/schema";
import { createEntry } from "./actions";

const EntryEditor = dynamic(() => import('../entry-editor/entry-editor'), {
  ssr: false,
  loading: () => <div>Loading editor...</div>
})

interface Props {
  initialCategories: Category[];
}

export function NewEntryForm({ initialCategories }: Props) {
  const [state, formAction, isPending] = useActionState(createEntry, { success: false, error: '' });
  const [richText, setRichText] = useState<string>('');

  function entryEditorHandler(newContent: string) {
    setRichText(newContent);
  }

  return (
    <div>
      <form action={formAction}>
        <input type="text" name="title" placeholder="Enter the entry title" />
        <CategoryDropdown initialCategories={initialCategories} />
        <EntryEditor
          content={richText}
          onChange={entryEditorHandler}
        />
        <input
          type="hidden"
          name="content"
          value={richText}
        />
        <button
          type="submit"
          disabled={isPending}
        >
          {isPending ? 'Adding...' : 'Add entry'}
        </button>
      </form>
      {state?.error && <p>{state.error}</p>}
    </div>
  );
}
