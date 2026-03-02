import { Toggle } from '@/components/ui';
import { Button } from '@/components/ui/button';
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
    }),
  });

  const alignments = [
    {
      id: 1,
      align: 'left',
      isActive: editorState.isLeft,
      icon: TextAlignStartIcon,
    },
    {
      id: 2,
      align: 'center',
      isActive: editorState.isCenter,
      icon: TextAlignCenterIcon,
    },
    {
      id: 3,
      align: 'right',
      isActive: editorState.isRight,
      icon: TextAlignEndIcon,
    },
    {
      id: 4,
      align: 'justify',
      isActive: editorState.isJustify,
      icon: TextAlignJustifyIcon,
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
        >
          <a.icon />
        </Toggle>
      ))}
    </div>
  );
}
