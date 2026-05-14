import { useEditorState } from '@tiptap/react';
import { Redo2Icon } from 'lucide-react';

import { Button } from '../../ui/button';

import { useEditorProvider } from '../../hooks/use-editor-provider';
import { Tooltip } from '../tooltip';

export function ToolbarRedo() {
  const { editor } = useEditorProvider();

  const editorState = useEditorState({
    editor,
    selector: () => ({
      can: editor.can().redo(),
    }),
  });

  return (
    <Tooltip content="Redo" disabled={!editorState.can}>
      <Button
        size="sm"
        variant="ghost"
        onClick={() => editor.chain().focus().redo().run()}
        aria-label="Redo"
        type="button"
      >
        <Redo2Icon className="size-4" />
      </Button>
    </Tooltip>
  );
}
