import { useEditorState } from '@tiptap/react';
import { BoldIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';

import { useEditorProvider } from '../../hooks/use-editor-provider';
import { Tooltip } from '../tooltip';

export function ToolbarBold() {
  const { editor } = useEditorProvider();

  const editorState = useEditorState({
    editor,
    selector: (ctx) => ({
      isActive: ctx.editor.isActive('bold'),
      can: ctx.editor.can().setBold(),
    }),
  });

  return (
    <Tooltip content="Bold" disabled={!editorState.can}>
      <Button
        size="sm"
        variant={editorState.isActive ? 'secondary' : 'ghost'}
        onClick={() => editor.chain().focus().toggleBold().run()}
        aria-label="Toggle bold"
        type="button"
      >
        <BoldIcon className="size-4" />
      </Button>
    </Tooltip>
  );
}
