'use client';

import { useEditor, EditorContent, type Editor } from '@tiptap/react';
import { TextStyleKit } from '@tiptap/extension-text-style';
import TextAlign from '@tiptap/extension-text-align';
import StarterKit from '@tiptap/starter-kit';
import TaskList from '@tiptap/extension-task-list';
import TaskItem from '@tiptap/extension-task-item';
import Image from "@tiptap/extension-image";
import { Toolbar } from "./toolbar";
import styles from './entry-editor.module.css';

interface Props {
  content: string;
  onChange?: (richText: string) => void;
  toolbar?: boolean;
}

export default function EntryEditor({ content, onChange, toolbar = false }: Props) {
  const editor = useEditor({
    extensions: [
      TextStyleKit,
      StarterKit,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      TaskList,
      TaskItem.configure({
        nested: true,
      }),
      Image.configure({
        inline: false,
        allowBase64: false,
        HTMLAttributes: { class: styles.image },
      }),
    ],
    autofocus: true,
    immediatelyRender: false,
    content: content,
    editable: toolbar,
    editorProps: {
      attributes: {
        class: styles.content,
      },
    },
    ...onChange && {
      onUpdate: ({ editor }) => {
        onChange(editor.getHTML());
      }
    },
  });

  if (!editor) return null;

  return (
    <div className={styles.editorContainer}>
      {toolbar && <Toolbar editor={editor as Editor} />}
      <EditorContent editor={editor} />
    </div>
  );
}
