import { useEditorState } from '@tiptap/react';
import { SuperscriptIcon } from 'lucide-react';

import { Button } from '../../ui/button';

import { useEditorProvider } from '../../hooks/use-editor-provider';
import { Tooltip } from '../tooltip';

export function ToolbarSuperscript() {
  const { editor } = useEditorProvider();

  const editorState = useEditorState({
    editor,
    selector: (ctx) => ({
      isActive: ctx.editor.isActive('superscript'),
      can: ctx.editor.can().toggleSuperscript(),
    }),
  });

  return (
    <Tooltip content="Superscript" disabled={!editorState.can}>
      <Button
        size="sm"
        variant={editorState.isActive ? 'secondary' : 'ghost'}
        onClick={() => editor.chain().focus().toggleSuperscript().run()}
        type="button"
      >
        <SuperscriptIcon />
      </Button>
    </Tooltip>
  );
}
