import { Toggle } from '@/components/ui';
import type { Editor } from '@tiptap/core';
import { useEditorState } from '@tiptap/react';
import {
  TextAlignCenterIcon,
  TextAlignEndIcon,
  TextAlignJustifyIcon,
  TextAlignStartIcon,
} from 'lucide-react';

export function ToolbarAlign({ editor }: { editor: Editor }) {
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
    },
    {
      id: 2,
      align: 'center',
      isActive: editorState.isCenter,
      icon: TextAlignCenterIcon,
      can: editorState.canCenter,
    },
    {
      id: 3,
      align: 'right',
      isActive: editorState.isRight,
      icon: TextAlignEndIcon,
      can: editorState.canRight,
    },
    {
      id: 4,
      align: 'justify',
      isActive: editorState.isJustify,
      icon: TextAlignJustifyIcon,
      can: editorState.canJustify,
    },
  ];

  return (
    <div className="flex gap-1 items-center">
      {alignments.map((a) => (
        <Toggle
          key={a.id}
          size="sm"
          pressed={a.isActive}
          onPressedChange={() =>
            editor.chain().focus().toggleTextAlign(a.align).run()
          }
          disabled={!a.can}
        >
          <a.icon />
        </Toggle>
      ))}
    </div>
  );
}
