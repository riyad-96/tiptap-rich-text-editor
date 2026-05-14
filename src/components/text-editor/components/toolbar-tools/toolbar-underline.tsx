import { useEditorState } from '@tiptap/react';
import { UnderlineIcon } from 'lucide-react';

import { Button } from '../../ui/button';

import { useEditorProvider } from '../../hooks/use-editor-provider';
import { Tooltip } from '../tooltip';

export function ToolbarUnderline() {
  const { editor } = useEditorProvider();

  const editorState = useEditorState({
    editor,
    selector: (ctx) => ({
      isActive: ctx.editor.isActive('underline'),
      can: ctx.editor.can().setUnderline(),
    }),
  });

  return (
    <Tooltip content="Underline" disabled={!editorState.can}>
      <Button
        size="sm"
        variant={editorState.isActive ? 'secondary' : 'ghost'}
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        aria-label="Toggle underline"
        type="button"
      >
        <UnderlineIcon className="size-4" />
      </Button>
    </Tooltip>
  );
}
