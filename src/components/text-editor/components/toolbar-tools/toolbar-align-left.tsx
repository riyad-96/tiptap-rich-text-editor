import { useEditorState } from '@tiptap/react';
import { TextAlignStartIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';

import { useEditorProvider } from '../../hooks/use-editor-provider';
import { Tooltip } from '../tooltip';

export function ToolbarAlignLeft() {
  const { editor } = useEditorProvider();

  const editorState = useEditorState({
    editor,
    selector: (ctx) => ({
      isActive: ctx.editor.isActive({ textAlign: 'left' }),
      can: ctx.editor.can().setTextAlign('left'),
    }),
  });

  return (
    <Tooltip content="Align left">
      <Button
        size="sm"
        variant={editorState.isActive ? 'secondary' : 'ghost'}
        onClick={() => editor.chain().focus().toggleTextAlign('left').run()}
        aria-label="Align left"
        type="button"
      >
        <TextAlignStartIcon />
      </Button>
    </Tooltip>
  );
}
