'use client';

import { useActionState, useState } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { Entry } from "@/lib/drizzle/schema";
import { updateEntry } from "@/actions/updateEntry";
import { useToast } from "@/components/toast";
import { Input } from "@/components/input";
import styles from './entry-edit.module.css';

const EntryEditor = dynamic(() => import('../entry-editor/entry-editor'), {
  ssr: false,
  loading: () => <div>Loading editor...</div>
});

interface Props {
  entry: Entry;
}

interface FormState {
  success: boolean;
  error?: string;
}

export function EntryEdit({ entry }: Props) {
  const [content, setContent] = useState(entry.content ?? '');
  const router = useRouter();
  const toastManager = useToast();
  const [state, formAction] = useActionState(handleSubmit, { success: false, error: '' });

  async function handleSubmit(prevState: FormState, formData: FormData): Promise<FormState> {
    const result = await updateEntry(prevState, formData);
    if (result.success) {
      toastManager.add({
        type: "success",
        title: "Entry updated",
        description: "Your changes have been saved.",
      });
      router.push(`/dashboard/entry/${entry.id}`);
    }
    return result;
  }

  return (
    <div className={styles.container}>
      <form action={formAction}>
        <input type="hidden" name="id" value={entry.id} />
        <input type="hidden" name="content" value={content} />
        {/*<div className={styles.header}>*/}
        {/*  <Input*/}
        {/*    name="title"*/}
        {/*    defaultValue={entry.title}*/}
        {/*    placeholder="Entry title"*/}
        {/*  />*/}
        {/*</div>*/}
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
