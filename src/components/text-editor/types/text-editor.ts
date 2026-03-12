import type { Content, Editor } from '@tiptap/core';

export type TextEditorProps = {
  hideBubbleMenuOnTouch?: boolean;
  content?: Content;
  onChange?: (editor: Editor) => void;
  onMount?: (editor: Editor) => void;
  placeholder?: string | boolean;
  hideTooltip?: boolean;
};
