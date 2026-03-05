import type { Content, Editor } from "@tiptap/core";

export type TextEditorProps = {
  hideBubbleMenuOnTouch?: boolean;
  content?: Content;
  onChange?: (value: Editor) => void;
  placeholder?: string | boolean;
};
