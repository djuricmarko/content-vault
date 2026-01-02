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
  Redo,
  TextAlignStart,
  TextAlignCenter,
  TextAlignEnd,
  Eraser,
  RemoveFormatting,
  Minus,
  ListTodo
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
        isTaskList: ctx.editor.isActive('taskList') ?? false,
        isCodeBlock: ctx.editor.isActive('codeBlock') ?? false,
        isBlockquote: ctx.editor.isActive('blockquote') ?? false,
        isLeft: ctx.editor.isActive({ textAlign: 'left' }) ?? false,
        isCenter: ctx.editor.isActive({ textAlign: 'center' }) ?? false,
        isRight: ctx.editor.isActive({ textAlign: 'right' }) ?? false,
        canUndo: ctx.editor.can().chain().undo().run() ?? false,
        canRedo: ctx.editor.can().chain().redo().run() ?? false,
      };
    },
  });

  return (
    <BaseToolbar.Root className={styles.toolbar} aria-label="Formatting options">
      {/* Headings Group */}
      <BaseToolbar.Group className={styles.buttonGroup}>
        <BaseToolbar.Button
          value="h1"
          aria-label="Heading 1"
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={editorState.isHeading1 ? styles.isActive : ''}
        >
          <Heading1 size={16} />
        </BaseToolbar.Button>
        <BaseToolbar.Button
          value="h2"
          aria-label="Heading 2"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={editorState.isHeading2 ? styles.isActive : ''}
        >
          <Heading2 size={16} />
        </BaseToolbar.Button>
        <BaseToolbar.Button
          value="h3"
          aria-label="Heading 3"
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={editorState.isHeading3 ? styles.isActive : ''}
        >
          <Heading3 size={16} />
        </BaseToolbar.Button>
        <BaseToolbar.Button
          value="h4"
          aria-label="Heading 4"
          onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
          className={`${editorState.isHeading4 ? styles.isActive : ''} ${styles.hideOnMobile}`}
        >
          <Heading4 size={16} />
        </BaseToolbar.Button>
        <BaseToolbar.Button
          value="h5"
          aria-label="Heading 5"
          onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
          className={`${editorState.isHeading5 ? styles.isActive : ''} ${styles.hideOnMobile}`}
        >
          <Heading5 size={16} />
        </BaseToolbar.Button>
        <BaseToolbar.Button
          value="h6"
          aria-label="Heading 6"
          onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
          className={`${editorState.isHeading6 ? styles.isActive : ''} ${styles.hideOnMobile}`}
        >
          <Heading6 size={16} />
        </BaseToolbar.Button>
        <BaseToolbar.Button
          value="paragraph"
          aria-label="Paragraph"
          onClick={() => editor.chain().focus().setParagraph().run()}
          className={editorState.isParagraph ? styles.isActive : ''}
        >
          <Pilcrow size={16} />
        </BaseToolbar.Button>
      </BaseToolbar.Group>

      <BaseToolbar.Separator className={styles.divider} />

      {/* Text Formatting Group */}
      <BaseToolbar.Group className={styles.buttonGroup}>
        <BaseToolbar.Button
          value="bold"
          aria-label="Bold"
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editorState.canBold}
          className={editorState.isBold ? styles.isActive : ''}
        >
          <Bold size={16} />
        </BaseToolbar.Button>
        <BaseToolbar.Button
          value="italic"
          aria-label="Italic"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editorState.canItalic}
          className={editorState.isItalic ? styles.isActive : ''}
        >
          <Italic size={16} />
        </BaseToolbar.Button>
        <BaseToolbar.Button
          value="strike"
          aria-label="Strikethrough"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editorState.canStrike}
          className={editorState.isStrike ? styles.isActive : ''}
        >
          <Strikethrough size={16} />
        </BaseToolbar.Button>
        <BaseToolbar.Button
          value="code"
          aria-label="Inline code"
          onClick={() => editor.chain().focus().toggleCode().run()}
          disabled={!editorState.canCode}
          className={editorState.isCode ? styles.isActive : ''}
        >
          <Code size={16} />
        </BaseToolbar.Button>
      </BaseToolbar.Group>

      <BaseToolbar.Separator className={styles.divider} />

      {/* Lists & Blocks Group */}
      <BaseToolbar.Group className={styles.buttonGroup}>
        <BaseToolbar.Button
          value="bulletList"
          aria-label="Bullet list"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editorState.isBulletList ? styles.isActive : ''}
        >
          <List size={16} />
        </BaseToolbar.Button>
        <BaseToolbar.Button
          value="orderedList"
          aria-label="Numbered list"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editorState.isOrderedList ? styles.isActive : ''}
        >
          <ListOrdered size={16} />
        </BaseToolbar.Button>
        <BaseToolbar.Button
          value="taskList"
          aria-label="Todo list"
          onClick={() => editor.chain().focus().toggleTaskList().run()}
          className={editorState.isTaskList ? styles.isActive : ''}
        >
          <ListTodo size={16} />
        </BaseToolbar.Button>
        <BaseToolbar.Button
          value="blockquote"
          aria-label="Blockquote"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={editorState.isBlockquote ? styles.isActive : ''}
        >
          <MessageSquareQuote size={16} />
        </BaseToolbar.Button>
        <BaseToolbar.Button
          value="horizontalRule"
          aria-label="Horizontal rule"
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
        >
          <Minus size={16} />
        </BaseToolbar.Button>
      </BaseToolbar.Group>

      <BaseToolbar.Separator className={`${styles.divider} ${styles.hideOnMobile}`} />

      {/* Alignment Group - hidden on mobile */}
      <BaseToolbar.Group className={`${styles.buttonGroup} ${styles.hideOnMobile}`}>
        <BaseToolbar.Button
          aria-label="Align left"
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
          className={editorState.isLeft ? styles.isActive : ''}
        >
          <TextAlignStart size={16} />
        </BaseToolbar.Button>
        <BaseToolbar.Button
          aria-label="Align center"
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
          className={editorState.isCenter ? styles.isActive : ''}
        >
          <TextAlignCenter size={16} />
        </BaseToolbar.Button>
        <BaseToolbar.Button
          aria-label="Align right"
          onClick={() => editor.chain().focus().setTextAlign('right').run()}
          className={editorState.isRight ? styles.isActive : ''}
        >
          <TextAlignEnd size={16} />
        </BaseToolbar.Button>
      </BaseToolbar.Group>

      <BaseToolbar.Separator className={`${styles.divider} ${styles.hideOnMobile}`} />

      {/* Clear & Utilities Group - hidden on mobile */}
      <BaseToolbar.Group className={`${styles.buttonGroup} ${styles.hideOnMobile}`}>
        <BaseToolbar.Button
          value="clearMarks"
          aria-label="Clear formatting"
          onClick={() => editor.chain().focus().unsetAllMarks().run()}
        >
          <RemoveFormatting size={16} />
        </BaseToolbar.Button>
        <BaseToolbar.Button
          value="clearNodes"
          aria-label="Clear blocks"
          onClick={() => editor.chain().focus().clearNodes().run()}
        >
          <Eraser size={16} />
        </BaseToolbar.Button>
      </BaseToolbar.Group>

      <BaseToolbar.Separator className={styles.divider} />

      {/* Undo/Redo Group */}
      <BaseToolbar.Group className={styles.buttonGroup}>
        <BaseToolbar.Button
          value="undo"
          aria-label="Undo"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editorState.canUndo}
        >
          <Undo size={16} />
        </BaseToolbar.Button>
        <BaseToolbar.Button
          value="redo"
          aria-label="Redo"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editorState.canRedo}
        >
          <Redo size={16} />
        </BaseToolbar.Button>
      </BaseToolbar.Group>
    </BaseToolbar.Root>
  );
}
