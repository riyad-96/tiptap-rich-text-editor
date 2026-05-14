import { useEditorState } from '@tiptap/react';
import { TextAlignJustifyIcon } from 'lucide-react';

import { Button } from '../../ui/button';

import { useEditorProvider } from '../../hooks/use-editor-provider';
import { Tooltip } from '../tooltip';

export function ToolbarAlignJustify() {
  const { editor } = useEditorProvider();

  const editorState = useEditorState({
    editor,
    selector: (ctx) => ({
      isActive: ctx.editor.isActive({ textAlign: 'justify' }),
      can: ctx.editor.can().setTextAlign('justify'),
    }),
  });

  return (
    <Tooltip content="Align justify">
      <Button
        size="sm"
        variant={editorState.isActive ? 'secondary' : 'ghost'}
        onClick={() => editor.chain().focus().toggleTextAlign('justify').run()}
        aria-label="Align justify"
        type="button"
      >
        <TextAlignJustifyIcon />
      </Button>
    </Tooltip>
  );
}
