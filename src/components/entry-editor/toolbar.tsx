import { type Editor, useEditorState } from "@tiptap/react";
import { Toolbar as BaseToolbar } from '@base-ui/react/toolbar';
import { useImageUpload } from "./use-image-upload";
import {
  HeadingsGroup,
  TextFormattingGroup,
  ListsBlocksGroup,
  AlignmentGroup,
  ClearGroup,
  UndoRedoGroup,
  type EditorState,
} from "./toolbar-groups";
import styles from "./entry-editor.module.css";

export function Toolbar({ editor }: { editor: Editor }) {
  const { isUploading, inputRef, triggerUpload, handleFileChange } = useImageUpload({
    onSuccess: (url) => {
      editor.chain().focus().setImage({ src: url }).run();
    },
  });

  const editorState: EditorState = useEditorState({
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
      <input
        ref={inputRef}
        type="file"
        accept="image/png,image/jpeg,image/gif,image/webp"
        onChange={handleFileChange}
        className={styles.hiddenInput}
        aria-hidden="true"
      />

      <HeadingsGroup editor={editor} editorState={editorState} />
      <BaseToolbar.Separator className={styles.divider} />

      <TextFormattingGroup editor={editor} editorState={editorState} />
      <BaseToolbar.Separator className={styles.divider} />

      <ListsBlocksGroup
        editor={editor}
        editorState={editorState}
        isUploading={isUploading}
        triggerUpload={triggerUpload}
      />
      <BaseToolbar.Separator className={`${styles.divider} ${styles.hideOnMobile}`} />

      <AlignmentGroup editor={editor} editorState={editorState} />
      <BaseToolbar.Separator className={`${styles.divider} ${styles.hideOnMobile}`} />

      <ClearGroup editor={editor} />
      <BaseToolbar.Separator className={styles.divider} />

      <UndoRedoGroup editor={editor} editorState={editorState} />
    </BaseToolbar.Root>
  );
}
