import { useEditorState } from '@tiptap/react';
import { StrikethroughIcon } from 'lucide-react';

import { Button } from '../../ui/button';

import { useEditorProvider } from '../../hooks/use-editor-provider';
import { Tooltip } from '../tooltip';

export function ToolbarStrike() {
  const { editor } = useEditorProvider();

  const editorState = useEditorState({
    editor,
    selector: (ctx) => ({
      isActive: ctx.editor.isActive('strike'),
      can: ctx.editor.can().setStrike(),
    }),
  });

  return (
    <Tooltip content="Strike" disabled={!editorState.can}>
      <Button
        size="sm"
        variant={editorState.isActive ? 'secondary' : 'ghost'}
        onClick={() => editor.chain().focus().toggleStrike().run()}
        aria-label="Toggle strike"
        type="button"
      >
        <StrikethroughIcon className="size-4" />
      </Button>
    </Tooltip>
  );
}
