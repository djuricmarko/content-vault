import { Bold, Code, Heading1, Heading2, Heading3, Italic, List, ListOrdered, Strikethrough } from "lucide-react";
import type { Editor } from "@tiptap/react";
import styles from "./entry-editor.module.css";

function getButtonClass(isActive: boolean) {
  return isActive ? `${styles.button} ${styles.isActive}` : styles.button;
}

export function Toolbar({ editor }: { editor: Editor | null }) {
  if (!editor) return null;

  return (
    <div className={styles.toolbar}>
      <div className={styles.buttonGroup}>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={getButtonClass(editor.isActive('heading', { level: 1 }))}
        >
          <Heading1 />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={getButtonClass(editor.isActive('heading', { level: 2 }))}
        >
          <Heading2 />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={getButtonClass(editor.isActive('heading', { level: 3 }))}
        >
          <Heading3 />
        </button>
      </div>

      <div className={styles.divider} />

      <div className={styles.buttonGroup}>
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={getButtonClass(editor.isActive('bold'))}
        >
          <Bold />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={getButtonClass(editor.isActive('italic'))}
        >
          <Italic />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleCode().run()}
          className={getButtonClass(editor.isActive('code'))}
        >
          <Code />
        </button>
      </div>

      <div className={styles.divider} />

      <div className={styles.buttonGroup}>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={getButtonClass(editor.isActive('bulletList'))}
        >
          <List />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={getButtonClass(editor.isActive('orderedList'))}
        >
          <ListOrdered />
        </button>
      </div>
    </div>
  );
}
