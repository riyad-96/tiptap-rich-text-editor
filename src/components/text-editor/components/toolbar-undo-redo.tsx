import { Redo2Icon, Undo2Icon } from 'lucide-react';
import { useEditorState } from '@tiptap/react';

import { Button } from '@/components/ui/button';

import { useEditorProvider } from '../hooks/use-editor-provider';
import { Tooltip } from './tooltip';

export function ToolbalUndoRedo() {
  const { editor } = useEditorProvider();

  const editorState = useEditorState({
    editor,
    selector: () => ({
      canUndo: editor.can().undo(),
      canRedo: editor.can().redo(),
    }),
  });

  return (
    <div className="flex gap-1">
      <Tooltip content="Undo" disabled={!editorState.canUndo}>
        <Button
          type="button"
          size="sm"
          variant="ghost"
          onClick={() => editor.chain().focus().undo().run()}
          aria-label="Undo"
        >
          <Undo2Icon className="size-4" />
        </Button>
      </Tooltip>

      <Tooltip content="Redo" disabled={!editorState.canRedo}>
        <Button
          type="button"
          size="sm"
          variant="ghost"
          onClick={() => editor.chain().focus().redo().run()}
          aria-label="Redo"
        >
          <Redo2Icon className="size-4" />
        </Button>
      </Tooltip>
    </div>
  );
}
