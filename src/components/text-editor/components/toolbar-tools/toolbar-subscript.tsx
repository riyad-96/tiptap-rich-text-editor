import { useEditorState } from '@tiptap/react';
import { SubscriptIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';

import { useEditorProvider } from '../../hooks/use-editor-provider';
import { Tooltip } from '../tooltip';

export function ToolbarSubscript() {
  const { editor } = useEditorProvider();

  const editorState = useEditorState({
    editor,
    selector: (ctx) => ({
      isActive: ctx.editor.isActive('subscript'),
      can: ctx.editor.can().toggleSubscript(),
    }),
  });

  return (
    <Tooltip content="Subscript" disabled={!editorState.can}>
      <Button
        size="sm"
        variant={editorState.isActive ? 'secondary' : 'ghost'}
        onClick={() => editor.chain().focus().toggleSubscript().run()}
        type="button"
      >
        <SubscriptIcon />
      </Button>
    </Tooltip>
  );
}
