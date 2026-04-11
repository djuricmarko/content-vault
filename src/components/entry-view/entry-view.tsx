'use client';

import dynamic from "next/dynamic";
import { Entry } from "@/lib/drizzle/schema";
import styles from './entry-view.module.css';

const EntryEditor = dynamic(() => import('../entry-editor/entry-editor'), {
  ssr: false,
  loading: () => <div>Loading editor...</div>
});

interface Props {
  entry: Entry;
}

export function EntryView({ entry }: Props) {
  return (
    <div className={styles.container}>
      <EntryEditor key="view" content={entry.content ?? ''} />
    </div>
  );
}
