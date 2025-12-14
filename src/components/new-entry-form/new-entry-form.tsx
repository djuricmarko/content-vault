'use client';

import { useActionState, useState } from "react";
import { EntryEditor } from "@/components/entry-editor";
import { CategoryDropdown } from "./category-dropdown";
import { createEntry } from "./actions";
import { Category } from "@/lib/drizzle/schema";

interface Props {
  initialCategories: Category[];
}

export function NewEntryForm({ initialCategories }: Props) {
  const [state, formAction, isPending] = useActionState(createEntry, { error: '' });
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
