import { type Editor, useEditorState } from "@tiptap/react";
import {
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  Bold,
  Code,
  Pilcrow,
  Italic,
  List,
  ListOrdered,
  Strikethrough,
  MessageSquareQuote,
  Undo,
  Redo
} from "lucide-react";
import { Toolbar as BaseToolbar } from '@base-ui/react/toolbar';
import styles from "./entry-editor.module.css";

export function Toolbar({ editor }: { editor: Editor }) {
  const editorState = useEditorState({
    editor,
    selector: ctx => {
      return {
        isBold: ctx.editor.isActive('bold') ?? false,
        canBold: ctx.editor.can().chain().toggleBold().run() ?? false,
        isItalic: ctx.editor.isActive('italic') ?? false,
        canItalic: ctx.editor.can().chain().toggleItalic().run() ?? false,
        isStrike: ctx.editor.isActive('strike') ?? false,
        canStrike: ctx.editor.can().chain().toggleStrike().run() ?? false,
        isCode: ctx.editor.isActive('code') ?? false,
        canCode: ctx.editor.can().chain().toggleCode().run() ?? false,
        canClearMarks: ctx.editor.can().chain().unsetAllMarks().run() ?? false,
        isParagraph: ctx.editor.isActive('paragraph') ?? false,
        isHeading1: ctx.editor.isActive('heading', { level: 1 }) ?? false,
        isHeading2: ctx.editor.isActive('heading', { level: 2 }) ?? false,
        isHeading3: ctx.editor.isActive('heading', { level: 3 }) ?? false,
        isHeading4: ctx.editor.isActive('heading', { level: 4 }) ?? false,
        isHeading5: ctx.editor.isActive('heading', { level: 5 }) ?? false,
        isHeading6: ctx.editor.isActive('heading', { level: 6 }) ?? false,
        isBulletList: ctx.editor.isActive('bulletList') ?? false,
        isOrderedList: ctx.editor.isActive('orderedList') ?? false,
        isCodeBlock: ctx.editor.isActive('codeBlock') ?? false,
        isBlockquote: ctx.editor.isActive('blockquote') ?? false,
        canUndo: ctx.editor.can().chain().undo().run() ?? false,
        canRedo: ctx.editor.can().chain().redo().run() ?? false,
      };
    },
  });

  if (!editor) return null;

  return (
    <BaseToolbar.Root className={styles.toolbar} aria-label="Formatting options">
      <BaseToolbar.Group className={styles.buttonGroup}>
        <BaseToolbar.Button
          value="h1"
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={editorState.isHeading1 ? styles.isActive : ''}
        >
          <Heading1 size={18} />
        </BaseToolbar.Button>
        <BaseToolbar.Button
          value="h2"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={editorState.isHeading2 ? styles.isActive : ''}
        >
          <Heading2 size={18} />
        </BaseToolbar.Button>
        <BaseToolbar.Button
          value="h3"
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={editorState.isHeading3 ? styles.isActive : ''}
        >
          <Heading3 size={18} />
        </BaseToolbar.Button>
        <BaseToolbar.Button
          value="h4"
          onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
          className={editorState.isHeading4 ? styles.isActive : ''}
        >
          <Heading4 size={18} />
        </BaseToolbar.Button>
        <BaseToolbar.Button
          value="h5"
          onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
          className={editorState.isHeading5 ? styles.isActive : ''}
        >
          <Heading5 size={18} />
        </BaseToolbar.Button>
        <BaseToolbar.Button
          value="h6"
          onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
          className={editorState.isHeading6 ? styles.isActive : ''}
        >
          <Heading6 size={18} />
        </BaseToolbar.Button>
        <BaseToolbar.Button
          value="paragraph"
          onClick={() => editor.chain().focus().setParagraph().run()}
          className={editorState.isParagraph ? styles.isActive : ''}
        >
          <Pilcrow size={18} />
        </BaseToolbar.Button>

        <BaseToolbar.Separator className={styles.divider} />

        <BaseToolbar.Button
          value="bold"
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editorState.canBold}
          className={editorState.isBold ? styles.isActive : ''}
        >
          <Bold size={18} />
        </BaseToolbar.Button>
        <BaseToolbar.Button
          value="italic"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editorState.canItalic}
          className={editorState.isItalic ? styles.isActive : ''}
        >
          <Italic size={18} />
        </BaseToolbar.Button>
        <BaseToolbar.Button
          value="strike"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editorState.canStrike}
          className={editorState.isStrike ? styles.isActive : ''}
        >
          <Strikethrough size={18} />
        </BaseToolbar.Button>
        <BaseToolbar.Button
          value="code"
          onClick={() => editor.chain().focus().toggleCode().run()}
          disabled={!editorState.canCode}
          className={editorState.isCode ? styles.isActive : ''}
        >
          <Code size={18} />
        </BaseToolbar.Button>

        <BaseToolbar.Separator className={styles.divider} />

        <BaseToolbar.Button
          value="bulletList"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editorState.isBulletList ? styles.isActive : ''}
        >
          <List size={18} />
        </BaseToolbar.Button>
        <BaseToolbar.Button
          value="orderedList"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editorState.isOrderedList ? styles.isActive : ''}
        >
          <ListOrdered size={18} />
        </BaseToolbar.Button>
        <BaseToolbar.Button
          value="blockquote"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={editorState.isBlockquote ? styles.isActive : ''}
        >
          <MessageSquareQuote size={18} />
        </BaseToolbar.Button>

        <BaseToolbar.Separator className={styles.divider} />

        <BaseToolbar.Button
          value="clearMarks"
          onClick={() => editor.chain().focus().unsetAllMarks().run()}
        >
          Clear marks
        </BaseToolbar.Button>
        <BaseToolbar.Button
          value="clearNodes"
          onClick={() => editor.chain().focus().clearNodes().run()}
        >
          Clear nodes
        </BaseToolbar.Button>
        <BaseToolbar.Button
          value="horizontalRule"
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
        >
          Horizontal rule
        </BaseToolbar.Button>
        <BaseToolbar.Button
          value="hardBreak"
          onClick={() => editor.chain().focus().setHardBreak().run()}
        >
          Hard break
        </BaseToolbar.Button>

        <BaseToolbar.Separator className={styles.divider} />

        <BaseToolbar.Button
          value="undo"
          onClick={() => editor.chain().focus().undo().run()} disabled={!editorState.canUndo}
        >
          <Undo size={18} />
        </BaseToolbar.Button>
        <BaseToolbar.Button
          value="redo"
          onClick={() => editor.chain().focus().redo().run()} disabled={!editorState.canRedo}
        >
          <Redo size={18} />
        </BaseToolbar.Button>
      </BaseToolbar.Group>
    </BaseToolbar.Root>
  );
}
