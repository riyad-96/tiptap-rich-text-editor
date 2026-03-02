import { Button } from '@/components/ui/button';
import { type Editor } from '@tiptap/core';
import { useEditorState } from '@tiptap/react';
import { Redo2Icon, Undo2Icon } from 'lucide-react';

export function ToolbalUndoRedo({ editor }: { editor: Editor }) {
  const editorState = useEditorState({
    editor,
    selector: () => ({
      canUndo: editor.can().undo(),
      canRedo: editor.can().redo(),
    }),
  });

  return (
    <div className="flex gap-1">
      <Button
        type="button"
        size="sm"
        variant="ghost"
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editorState.canUndo}
        aria-label="Undo"
      >
        <Undo2Icon className="size-4" />
      </Button>

      <Button
        type="button"
        size="sm"
        variant="ghost"
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editorState.canRedo}
        aria-label="Redo"
      >
        <Redo2Icon className="size-4" />
      </Button>
    </div>
  );
}
