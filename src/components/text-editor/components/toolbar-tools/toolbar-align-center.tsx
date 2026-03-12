import { useEditorState } from '@tiptap/react';
import { TextAlignCenterIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';

import { useEditorProvider } from '../../hooks/use-editor-provider';
import { Tooltip } from '../tooltip';

export function ToolbarAlignCenter() {
  const { editor } = useEditorProvider();

  const editorState = useEditorState({
    editor,
    selector: (ctx) => ({
      isActive: ctx.editor.isActive({ textAlign: 'center' }),
      can: ctx.editor.can().setTextAlign('center'),
    }),
  });

  return (
    <Tooltip content="Align center">
      <Button
        size="sm"
        variant={editorState.isActive ? 'secondary' : 'ghost'}
        onClick={() => editor.chain().focus().toggleTextAlign('center').run()}
        aria-label="Align center"
        type="button"
      >
        <TextAlignCenterIcon />
      </Button>
    </Tooltip>
  );
}
