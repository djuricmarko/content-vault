'use client';

import { useActionState, useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { Entry } from "@/lib/drizzle/schema";
import { updateEntry } from "@/actions/updateEntry";
import { Button } from "@/components/button";
import { Input } from "@/components/input";
import styles from './entry-view.module.css';

const EntryEditor = dynamic(() => import('../entry-editor/entry-editor'), {
  ssr: false,
  loading: () => <div>Loading editor...</div>
});

interface Props {
  entry: Entry;
}

export function EntryView({ entry }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(entry.title);
  const [content, setContent] = useState(entry.content ?? '');
  const [state, formAction, isPending] = useActionState(updateEntry, { success: false, error: '' });

  useEffect(() => {
    if (state.success) {
      setIsEditing(false);
    }
  }, [state.success]);

  function handleCancel() {
    setTitle(entry.title);
    setContent(entry.content ?? '');
    setIsEditing(false);
  }

  if (!isEditing) {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>{entry.title}</h2>
          <Button variant="secondary" onClick={() => setIsEditing(true)}>
            Edit
          </Button>
        </div>
        <EntryEditor key="view" content={entry.content ?? ''} />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <form action={formAction}>
        <input type="hidden" name="id" value={entry.id} />
        <input type="hidden" name="content" value={content} />
        <div className={styles.header}>
          <Input
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Entry title"
          />
          <div className={styles.actions}>
            <Button type="button" variant="secondary" onClick={handleCancel}>
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? 'Saving...' : 'Save'}
            </Button>
          </div>
        </div>
        <EntryEditor
          key="edit"
          content={content}
          onChange={setContent}
          toolbar
        />
      </form>
      {state?.error && <p className={styles.error}>{state.error}</p>}
    </div>
  );
}
