import { useEditorState } from '@tiptap/react';
import {
  TextAlignCenterIcon,
  TextAlignEndIcon,
  TextAlignJustifyIcon,
  TextAlignStartIcon,
} from 'lucide-react';

import { Tooltip } from './tooltip';

import { useEditorProvider } from '../hooks/use-editor-provider';
import { Button } from '@/components/ui/button';

export function ToolbarAlign() {
  const { editor } = useEditorProvider();

  const editorState = useEditorState({
    editor,
    selector: (ctx) => ({
      isLeft: ctx.editor.isActive({ textAlign: 'left' }),
      isCenter: ctx.editor.isActive({ textAlign: 'center' }),
      isRight: ctx.editor.isActive({ textAlign: 'right' }),
      isJustify: ctx.editor.isActive({ textAlign: 'justify' }),
      canLeft: ctx.editor.can().setTextAlign('left'),
      canCenter: ctx.editor.can().setTextAlign('center'),
      canRight: ctx.editor.can().setTextAlign('right'),
      canJustify: ctx.editor.can().setTextAlign('justify'),
    }),
  });

  const alignments = [
    {
      id: 1,
      align: 'left',
      isActive: editorState.isLeft,
      icon: TextAlignStartIcon,
      can: editorState.canLeft,
      text: 'Align left',
    },
    {
      id: 2,
      align: 'center',
      isActive: editorState.isCenter,
      icon: TextAlignCenterIcon,
      can: editorState.canCenter,
      text: 'Align center',
    },
    {
      id: 3,
      align: 'right',
      isActive: editorState.isRight,
      icon: TextAlignEndIcon,
      can: editorState.canRight,
      text: 'Align right',
    },
    {
      id: 4,
      align: 'justify',
      isActive: editorState.isJustify,
      icon: TextAlignJustifyIcon,
      can: editorState.canJustify,
      text: 'Align justify',
    },
  ];

  return (
    <div className="flex items-center gap-1">
      {alignments.map((a) => (
        <Tooltip key={a.id} content={a.text} disabled={!a.can}>
          <Button
            size="sm"
            variant={a.isActive ? 'secondary' : 'ghost'}
            onClick={() =>
              editor.chain().focus().toggleTextAlign(a.align).run()
            }
            aria-label={a.text}
          >
            <a.icon />
          </Button>
        </Tooltip>
      ))}
    </div>
  );
}
