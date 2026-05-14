import { useEditorState } from '@tiptap/react';
import { ItalicIcon } from 'lucide-react';

import { Button } from '../../ui/button';

import { useEditorProvider } from '../../hooks/use-editor-provider';
import { Tooltip } from '../tooltip';

export function ToolbarItalic() {
  const { editor } = useEditorProvider();

  const editorState = useEditorState({
    editor,
    selector: (ctx) => ({
      isActive: ctx.editor.isActive('italic'),
      can: ctx.editor.can().setItalic(),
    }),
  });

  return (
    <Tooltip content="Italic" disabled={!editorState.can}>
      <Button
        size="sm"
        variant={editorState.isActive ? 'secondary' : 'ghost'}
        onClick={() => editor.chain().focus().toggleItalic().run()}
        aria-label="Toggle italic"
        type="button"
      >
        <ItalicIcon className="size-4" />
      </Button>
    </Tooltip>
  );
}
