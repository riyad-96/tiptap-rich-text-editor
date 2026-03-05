import { useEditorState } from '@tiptap/react';
import { SubscriptIcon, SuperscriptIcon } from 'lucide-react';

import { Toggle } from '@/components/ui';

import { useEditorProvider } from '../hooks/use-editor-provider';

export function ToolbarSupSubscript() {
  const { editor } = useEditorProvider();

  const editorState = useEditorState({
    editor,
    selector: (ctx) => ({
      isSup: ctx.editor.isActive('superscript'),
      isSub: ctx.editor.isActive('subscript'),
      canSup: ctx.editor.can().toggleSuperscript(),
      canSub: ctx.editor.can().toggleSubscript(),
    }),
  });

  return (
    <div className="flex items-center gap-1">
      <Toggle
        size="sm"
        pressed={editorState.isSup}
        onPressedChange={() => editor.chain().focus().toggleSuperscript().run()}
        disabled={!editorState.canSup}
      >
        <SuperscriptIcon />
      </Toggle>

      <Toggle
        size="sm"
        pressed={editorState.isSub}
        onPressedChange={() => editor.chain().focus().toggleSubscript().run()}
        disabled={!editorState.canSub}
      >
        <SubscriptIcon />
      </Toggle>
    </div>
  );
}
