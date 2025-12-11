'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import { BulletList, ListItem, OrderedList } from '@tiptap/extension-list';
import { Color, TextStyle } from '@tiptap/extension-text-style';
import Document from '@tiptap/extension-document';
import Paragraph from '@tiptap/extension-paragraph';
import Text from "@tiptap/extension-text";
import Heading from "@tiptap/extension-heading";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Code from "@tiptap/extension-code";
import { Toolbar } from "./Toolbar";
import styles from './entry-editor.module.css';

interface Props {
  content: string;
  onChange: (richText: string) => void;
}

export function EntryEditor({ content, onChange }: Props) {
  const editor = useEditor({
    extensions: [
      Document,
      Paragraph,
      Text,
      Heading.configure({
        levels: [1, 2, 3],
      }),
      Bold,
      Italic,
      Code,
      BulletList,
      OrderedList,
      ListItem,
      Color,
      TextStyle
    ],
    autofocus: true,
    immediatelyRender: false,
    content: content,
    editorProps: {
      attributes: {
        class: styles.content,
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
  });

  return (
    <div className={styles.editorContainer}>
      <Toolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}
