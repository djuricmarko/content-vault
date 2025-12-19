'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import { TextStyleKit } from '@tiptap/extension-text-style';
import StarterKit from '@tiptap/starter-kit';
import { Toolbar } from "./toolbar";
import styles from './entry-editor.module.css';

interface Props {
  content: string;
  onChange: (richText: string) => void;
}

export default function EntryEditor({ content, onChange }: Props) {
  const editor = useEditor({
    extensions: [TextStyleKit, StarterKit],
    autofocus: true,
    immediatelyRender: false,
    content: content,
    editorProps: {
      attributes: {
        class: styles.content,
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  if (!editor) return null;

  return (
    <div className={styles.editorContainer}>
      <Toolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}
