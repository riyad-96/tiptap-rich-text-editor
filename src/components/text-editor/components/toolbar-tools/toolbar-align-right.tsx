import { useEditorState } from '@tiptap/react';
import { TextAlignEndIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';

import { useEditorProvider } from '../../hooks/use-editor-provider';
import { Tooltip } from '../tooltip';

export function ToolbarAlignRight() {
  const { editor } = useEditorProvider();

  const editorState = useEditorState({
    editor,
    selector: (ctx) => ({
      isActive: ctx.editor.isActive({ textAlign: 'right' }),
      can: ctx.editor.can().setTextAlign('right'),
    }),
  });

  return (
    <Tooltip content="Align right">
      <Button
        size="sm"
        variant={editorState.isActive ? 'secondary' : 'ghost'}
        onClick={() => editor.chain().focus().toggleTextAlign('right').run()}
        aria-label="Align right"
        type="button"
      >
        <TextAlignEndIcon />
      </Button>
    </Tooltip>
  );
}
