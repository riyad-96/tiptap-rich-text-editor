import { useEditorState } from '@tiptap/react';
import {
  BoldIcon,
  CodeXmlIcon,
  ItalicIcon,
  StrikethroughIcon,
  UnderlineIcon,
} from 'lucide-react';

import { Toggle } from '@/components/ui';

import { useEditorProvider } from '../hooks/use-editor-provider';

export function ToolbarBasicTools() {
  const { editor } = useEditorProvider();

  const editorState = useEditorState({
    editor,
    selector: (ctx) => ({
      isBold: ctx.editor.isActive('bold'),
      isItalic: ctx.editor.isActive('italic'),
      isUnderline: ctx.editor.isActive('underline'),
      isStrike: ctx.editor.isActive('strike'),
      isCode: ctx.editor.isActive('code'),
      canBold: ctx.editor.can().setBold(),
      canItalic: ctx.editor.can().setItalic(),
      canUnderline: ctx.editor.can().setUnderline(),
      canStrike: ctx.editor.can().setStrike(),
      canCode: ctx.editor.can().setCode(),
    }),
  });

  return (
    <div className="flex gap-1">
      <Toggle
        size="sm"
        pressed={editorState.isBold}
        onPressedChange={() => editor.chain().focus().toggleBold().run()}
        aria-label="Toggle bold"
        disabled={!editorState.canBold}
      >
        <BoldIcon className="size-4" />
      </Toggle>

      <Toggle
        size="sm"
        pressed={editorState.isItalic}
        onPressedChange={() => editor.chain().focus().toggleItalic().run()}
        aria-label="Toggle Italic"
        disabled={!editorState.canItalic}
      >
        <ItalicIcon className="size-4" />
      </Toggle>

      <Toggle
        size="sm"
        pressed={editorState.isUnderline}
        onPressedChange={() => editor.chain().focus().toggleUnderline().run()}
        aria-label="Toggle underline"
        disabled={!editorState.canUnderline}
      >
        <UnderlineIcon className="size-4" />
      </Toggle>

      <Toggle
        size="sm"
        pressed={editorState.isStrike}
        onPressedChange={() => editor.chain().focus().toggleStrike().run()}
        aria-label="Toggle strikethrough"
        disabled={!editorState.canStrike}
      >
        <StrikethroughIcon className="size-4" />
      </Toggle>

      <Toggle
        size="sm"
        pressed={editorState.isCode}
        onPressedChange={() => editor.chain().focus().toggleCode().run()}
        aria-label="Toggle code"
        disabled={!editorState.canCode}
      >
        <CodeXmlIcon className="size-4" />
      </Toggle>
    </div>
  );
}
