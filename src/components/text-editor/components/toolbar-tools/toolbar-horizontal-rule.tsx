import { useEditorState } from '@tiptap/react';
import { SeparatorHorizontalIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';

import { useEditorProvider } from '../../hooks/use-editor-provider';
import { Tooltip } from '../tooltip';

export function ToolbarHorizontalRule() {
  const { editor } = useEditorProvider();

  const editorState = useEditorState({
    editor,
    selector: (ctx) => ({
      isActive: ctx.editor.isActive('separator'),
      can: ctx.editor.can().setHorizontalRule(),
    }),
  });

  return (
    <Tooltip content="Divider">
      <Button
        size="sm"
        variant={editorState.isActive ? 'secondary' : 'ghost'}
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
        aria-label="Divider"
        type="button"
      >
        <SeparatorHorizontalIcon />
      </Button>
    </Tooltip>
  );
}
