import { useEditorState } from '@tiptap/react';
import { CodeXmlIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';

import { useEditorProvider } from '../../hooks/use-editor-provider';
import { Tooltip } from '../tooltip';

export function ToolbarCode() {
  const { editor } = useEditorProvider();

  const editorState = useEditorState({
    editor,
    selector: (ctx) => ({
      isActive: ctx.editor.isActive('code'),
      can: ctx.editor.can().setCode(),
    }),
  });

  return (
    <Tooltip content="Code" disabled={!editorState.can}>
      <Button
        size="sm"
        variant={editorState.isActive ? 'secondary' : 'ghost'}
        onClick={() => editor.chain().focus().toggleCode().run()}
        aria-label="Toggle code"
        type="button"
      >
        <CodeXmlIcon className="size-4" />
      </Button>
    </Tooltip>
  );
}
