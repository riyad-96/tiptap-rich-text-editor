import { useEditorState } from '@tiptap/react';
import { SubscriptIcon, SuperscriptIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';

import { useEditorProvider } from '../hooks/use-editor-provider';
import { Tooltip } from './tooltip';

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
      <Tooltip content="Superscript" disabled={!editorState.canSup}>
        <Button
          size="sm"
          variant={editorState.isSup ? 'secondary' : 'ghost'}
          onClick={() => editor.chain().focus().toggleSuperscript().run()}
        >
          <SuperscriptIcon />
        </Button>
      </Tooltip>

      <Tooltip content="Subscript" disabled={!editorState.canSub}>
        <Button
          size="sm"
          variant={editorState.isSub ? 'secondary' : 'ghost'}
          onClick={() => editor.chain().focus().toggleSubscript().run()}
        >
          <SubscriptIcon />
        </Button>
      </Tooltip>
    </div>
  );
}
