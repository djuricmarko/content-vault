import type { Editor } from "@tiptap/react";
import { Toolbar as RadixToolbar } from "radix-ui";
import { Bold, Code, Heading1, Heading2, Heading3, Italic, List, ListOrdered } from "lucide-react";
import styles from "./entry-editor.module.css";

export function Toolbar({ editor }: { editor: Editor | null }) {
  if (!editor) return null;

  return (
    <RadixToolbar.Root className={styles.toolbar} aria-label="Formatting options">
      <RadixToolbar.ToggleGroup type="multiple" className={styles.buttonGroup}>
        <RadixToolbar.ToggleItem
          value="heading1"
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={styles.button}
        >
          <Heading1 size={15} />
        </RadixToolbar.ToggleItem>
        <RadixToolbar.ToggleItem
          value="heading2"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={styles.button}
        >
          <Heading2 size={15} />
        </RadixToolbar.ToggleItem>
        <RadixToolbar.ToggleItem
          value="heading3"
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={styles.button}
        >
          <Heading3 size={15} />
        </RadixToolbar.ToggleItem>
      </RadixToolbar.ToggleGroup>
      <RadixToolbar.Separator className={styles.divider} />
      <RadixToolbar.ToggleGroup type="multiple" className={styles.buttonGroup}>
        <RadixToolbar.ToggleItem
          value="bold"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={styles.button}
        >
          <Bold size={15} />
        </RadixToolbar.ToggleItem>
        <RadixToolbar.ToggleItem
          value="italic"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={styles.button}
        >
          <Italic size={15} />
        </RadixToolbar.ToggleItem>
        <RadixToolbar.ToggleItem
          value="code"
          onClick={() => editor.chain().focus().toggleCode().run()}
          className={styles.button}
        >
          <Code size={15} />
        </RadixToolbar.ToggleItem>
      </RadixToolbar.ToggleGroup>

      <RadixToolbar.Separator className={styles.divider} />

      <RadixToolbar.ToggleGroup type="single" className={styles.buttonGroup}>
        <RadixToolbar.ToggleItem
          value="bulletList"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={styles.button}
        >
          <List size={15} />
        </RadixToolbar.ToggleItem>
        <RadixToolbar.ToggleItem
          value="orderedList"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={styles.button}
        >
          <ListOrdered size={15} />
        </RadixToolbar.ToggleItem>
      </RadixToolbar.ToggleGroup>
    </RadixToolbar.Root>
  );
}
