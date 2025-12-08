import type { Editor } from "@tiptap/react";
import styles from "@/components/EntryEditor/entry-editor.module.css";

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
          H1
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={getButtonClass(editor.isActive('heading', { level: 2 }))}
        >
          H2
        </button>
      </div>

      <div className={styles.divider} />

      <div className={styles.buttonGroup}>
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={getButtonClass(editor.isActive('bold'))}
        >
          B
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={getButtonClass(editor.isActive('italic'))}
        >
          I
        </button>
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={getButtonClass(editor.isActive('strike'))}
        >
          S
        </button>
        <button
          onClick={() => editor.chain().focus().toggleCode().run()}
          className={getButtonClass(editor.isActive('code'))}
        >
          Code
        </button>
      </div>

      <div className={styles.divider} />

      <div className={styles.buttonGroup}>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={getButtonClass(editor.isActive('bulletList'))}
        >
          UL
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={getButtonClass(editor.isActive('orderedList'))}
        >
          OL
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={getButtonClass(editor.isActive('blockquote'))}
        >
          &#34;&#34;
        </button>
      </div>

      <div className={styles.divider} />

      <div className={styles.buttonGroup}>
        <button
          className={styles.button}
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
        >
          Line
        </button>
        <button
          className={styles.button}
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
        >
          Undo
        </button>
        <button
          className={styles.button}
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
        >
          Redo
        </button>
      </div>
    </div>
  );
}
