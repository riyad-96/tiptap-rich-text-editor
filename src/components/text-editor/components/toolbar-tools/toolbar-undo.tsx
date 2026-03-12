import { useEditorState } from '@tiptap/react';
import { Undo2Icon } from 'lucide-react';

import { Button } from '@/components/ui/button';

import { useEditorProvider } from '../../hooks/use-editor-provider';
import { Tooltip } from '../tooltip';

export function ToolbarUndo() {
  const { editor } = useEditorProvider();

  const editorState = useEditorState({
    editor,
    selector: () => ({
      can: editor.can().undo(),
    }),
  });

  return (
    <Tooltip content="Undo" disabled={!editorState.can}>
      <Button
        size="sm"
        variant="ghost"
        onClick={() => editor.chain().focus().undo().run()}
        aria-label="Undo"
        type="button"
      >
        <Undo2Icon className="size-4" />
      </Button>
    </Tooltip>
  );
}
