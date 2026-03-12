import { useEditorState } from '@tiptap/react';
import { CodeSquareIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';

import { useEditorProvider } from '../../hooks/use-editor-provider';
import { Tooltip } from '../tooltip';

export function ToolbarCodeblock() {
  const { editor } = useEditorProvider();

  const editorState = useEditorState({
    editor,
    selector: (ctx) => ({
      isActive: ctx.editor.isActive('codeBlock'),
      can: ctx.editor.can().toggleCodeBlock(),
    }),
  });

  return (
    <Tooltip content="Codeblock">
      <Button
        size="sm"
        variant={editorState.isActive ? 'secondary' : 'ghost'}
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        aria-label="Toggle code block"
        type="button"
      >
        <CodeSquareIcon className="size-4" />
      </Button>
    </Tooltip>
  );
}
