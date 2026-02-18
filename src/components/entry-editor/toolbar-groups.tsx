import type { Editor } from "@tiptap/react";
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
  ListTodo,
  ImagePlus,
  Loader2,
} from "lucide-react";
import { Toolbar } from '@base-ui/react/toolbar';
import { ToolbarButton } from './toolbar-button';
import styles from "./entry-editor.module.css";

interface EditorState {
  isBold: boolean;
  canBold: boolean;
  isItalic: boolean;
  canItalic: boolean;
  isStrike: boolean;
  canStrike: boolean;
  isCode: boolean;
  canCode: boolean;
  isParagraph: boolean;
  isHeading1: boolean;
  isHeading2: boolean;
  isHeading3: boolean;
  isHeading4: boolean;
  isHeading5: boolean;
  isHeading6: boolean;
  isBulletList: boolean;
  isOrderedList: boolean;
  isTaskList: boolean;
  isBlockquote: boolean;
  isLeft: boolean;
  isCenter: boolean;
  isRight: boolean;
  canUndo: boolean;
  canRedo: boolean;
}

interface GroupProps {
  editor: Editor;
  editorState: EditorState;
}

export type { EditorState };

export function HeadingsGroup({ editor, editorState }: GroupProps) {
  return (
    <Toolbar.Group className={styles.buttonGroup}>
      <ToolbarButton
        value="h1"
        aria-label="Heading 1"
        tooltip="Heading 1"
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={editorState.isHeading1 ? styles.isActive : ''}
      >
        <Heading1 size={16} />
      </ToolbarButton>
      <ToolbarButton
        value="h2"
        aria-label="Heading 2"
        tooltip="Heading 2"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={editorState.isHeading2 ? styles.isActive : ''}
      >
        <Heading2 size={16} />
      </ToolbarButton>
      <ToolbarButton
        value="h3"
        aria-label="Heading 3"
        tooltip="Heading 3"
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={editorState.isHeading3 ? styles.isActive : ''}
      >
        <Heading3 size={16} />
      </ToolbarButton>
      <ToolbarButton
        value="h4"
        aria-label="Heading 4"
        tooltip="Heading 4"
        onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
        className={`${editorState.isHeading4 ? styles.isActive : ''} ${styles.hideOnMobile}`}
      >
        <Heading4 size={16} />
      </ToolbarButton>
      <ToolbarButton
        value="h5"
        aria-label="Heading 5"
        tooltip="Heading 5"
        onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
        className={`${editorState.isHeading5 ? styles.isActive : ''} ${styles.hideOnMobile}`}
      >
        <Heading5 size={16} />
      </ToolbarButton>
      <ToolbarButton
        value="h6"
        aria-label="Heading 6"
        tooltip="Heading 6"
        onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
        className={`${editorState.isHeading6 ? styles.isActive : ''} ${styles.hideOnMobile}`}
      >
        <Heading6 size={16} />
      </ToolbarButton>
      <ToolbarButton
        value="paragraph"
        aria-label="Paragraph"
        tooltip="Paragraph"
        onClick={() => editor.chain().focus().setParagraph().run()}
        className={editorState.isParagraph ? styles.isActive : ''}
      >
        <Pilcrow size={16} />
      </ToolbarButton>
    </Toolbar.Group>
  );
}

export function TextFormattingGroup({ editor, editorState }: GroupProps) {
  return (
    <Toolbar.Group className={styles.buttonGroup}>
      <ToolbarButton
        value="bold"
        aria-label="Bold"
        tooltip="Bold"
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editorState.canBold}
        className={editorState.isBold ? styles.isActive : ''}
      >
        <Bold size={16} />
      </ToolbarButton>
      <ToolbarButton
        value="italic"
        aria-label="Italic"
        tooltip="Italic"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editorState.canItalic}
        className={editorState.isItalic ? styles.isActive : ''}
      >
        <Italic size={16} />
      </ToolbarButton>
      <ToolbarButton
        value="strike"
        aria-label="Strikethrough"
        tooltip="Strikethrough"
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editorState.canStrike}
        className={editorState.isStrike ? styles.isActive : ''}
      >
        <Strikethrough size={16} />
      </ToolbarButton>
      <ToolbarButton
        value="code"
        aria-label="Inline code"
        tooltip="Inline code"
        onClick={() => editor.chain().focus().toggleCode().run()}
        disabled={!editorState.canCode}
        className={editorState.isCode ? styles.isActive : ''}
      >
        <Code size={16} />
      </ToolbarButton>
    </Toolbar.Group>
  );
}

interface ListsBlocksGroupProps extends GroupProps {
  isUploading: boolean;
  triggerUpload: () => void;
}

export function ListsBlocksGroup({ editor, editorState, isUploading, triggerUpload }: ListsBlocksGroupProps) {
  return (
    <Toolbar.Group className={styles.buttonGroup}>
      <ToolbarButton
        value="bulletList"
        aria-label="Bullet list"
        tooltip="Bullet list"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editorState.isBulletList ? styles.isActive : ''}
      >
        <List size={16} />
      </ToolbarButton>
      <ToolbarButton
        value="orderedList"
        aria-label="Numbered list"
        tooltip="Numbered list"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={editorState.isOrderedList ? styles.isActive : ''}
      >
        <ListOrdered size={16} />
      </ToolbarButton>
      <ToolbarButton
        value="taskList"
        aria-label="Todo list"
        tooltip="Todo list"
        onClick={() => editor.chain().focus().toggleTaskList().run()}
        className={editorState.isTaskList ? styles.isActive : ''}
      >
        <ListTodo size={16} />
      </ToolbarButton>
      <ToolbarButton
        value="blockquote"
        aria-label="Blockquote"
        tooltip="Blockquote"
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={editorState.isBlockquote ? styles.isActive : ''}
      >
        <MessageSquareQuote size={16} />
      </ToolbarButton>
      <ToolbarButton
        value="horizontalRule"
        aria-label="Horizontal rule"
        tooltip="Horizontal rule"
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
      >
        <Minus size={16} />
      </ToolbarButton>
      <ToolbarButton
        value="image"
        aria-label="Add image"
        tooltip="Add image"
        onClick={triggerUpload}
        disabled={isUploading}
      >
        {isUploading ? <Loader2 size={16} className={styles.spinning} /> : <ImagePlus size={16} />}
      </ToolbarButton>
    </Toolbar.Group>
  );
}

export function AlignmentGroup({ editor, editorState }: GroupProps) {
  return (
    <Toolbar.Group className={`${styles.buttonGroup} ${styles.hideOnMobile}`}>
      <ToolbarButton
        aria-label="Align left"
        tooltip="Align left"
        onClick={() => editor.chain().focus().setTextAlign('left').run()}
        className={editorState.isLeft ? styles.isActive : ''}
      >
        <TextAlignStart size={16} />
      </ToolbarButton>
      <ToolbarButton
        aria-label="Align center"
        tooltip="Align center"
        onClick={() => editor.chain().focus().setTextAlign('center').run()}
        className={editorState.isCenter ? styles.isActive : ''}
      >
        <TextAlignCenter size={16} />
      </ToolbarButton>
      <ToolbarButton
        aria-label="Align right"
        tooltip="Align right"
        onClick={() => editor.chain().focus().setTextAlign('right').run()}
        className={editorState.isRight ? styles.isActive : ''}
      >
        <TextAlignEnd size={16} />
      </ToolbarButton>
    </Toolbar.Group>
  );
}

export function ClearGroup({ editor }: { editor: Editor }) {
  return (
    <Toolbar.Group className={`${styles.buttonGroup} ${styles.hideOnMobile}`}>
      <ToolbarButton
        value="clearMarks"
        aria-label="Clear formatting"
        tooltip="Clear formatting"
        onClick={() => editor.chain().focus().unsetAllMarks().run()}
      >
        <RemoveFormatting size={16} />
      </ToolbarButton>
      <ToolbarButton
        value="clearNodes"
        aria-label="Clear blocks"
        tooltip="Clear blocks"
        onClick={() => editor.chain().focus().clearNodes().run()}
      >
        <Eraser size={16} />
      </ToolbarButton>
    </Toolbar.Group>
  );
}

export function UndoRedoGroup({ editor, editorState }: GroupProps) {
  return (
    <Toolbar.Group className={styles.buttonGroup}>
      <ToolbarButton
        value="undo"
        aria-label="Undo"
        tooltip="Undo"
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editorState.canUndo}
      >
        <Undo size={16} />
      </ToolbarButton>
      <ToolbarButton
        value="redo"
        aria-label="Redo"
        tooltip="Redo"
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editorState.canRedo}
      >
        <Redo size={16} />
      </ToolbarButton>
    </Toolbar.Group>
  );
}
