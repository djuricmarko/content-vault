'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Toolbar } from "./Toolbar";
import styles from './entry-editor.module.css';

export function EntryEditor() {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
    ],
    content: '<p>Start writing your entry...</p>',
    autofocus: true,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: styles.content,
      },
    },
  });

  return (
    <div className={styles.editorContainer}>
      <Toolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}
