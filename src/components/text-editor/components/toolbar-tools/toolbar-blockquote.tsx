import { useEditorState } from '@tiptap/react';
import { TextQuoteIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';

import { useEditorProvider } from '../../hooks/use-editor-provider';
import { Tooltip } from '../tooltip';

export function ToolbarBlockquote() {
  const { editor } = useEditorProvider();

  const editorState = useEditorState({
    editor,
    selector: (ctx) => ({
      isActive: ctx.editor.isActive('blockquote'),
      can: ctx.editor.can().toggleBlockquote(),
    }),
  });

  return (
    <Tooltip content="Blockquote" disabled={!editorState.can}>
      <Button
        size="sm"
        variant={editorState.isActive ? 'secondary' : 'ghost'}
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        aria-label="Toggle blockquote"
        type="button"
      >
        <TextQuoteIcon className="size-4" />
      </Button>
    </Tooltip>
  );
}
