import { useEditorState } from '@tiptap/react';
import {
  BoldIcon,
  CodeXmlIcon,
  ItalicIcon,
  StrikethroughIcon,
  UnderlineIcon,
} from 'lucide-react';

import { Button } from '@/components/ui/button';

import { useEditorProvider } from '../hooks/use-editor-provider';
import { Tooltip } from './tooltip';

export function ToolbarBasicTools() {
  const { editor } = useEditorProvider();

  const editorState = useEditorState({
    editor,
    selector: (ctx) => ({
      isBold: ctx.editor.isActive('bold'),
      isItalic: ctx.editor.isActive('italic'),
      isUnderline: ctx.editor.isActive('underline'),
      isStrike: ctx.editor.isActive('strike'),
      isCode: ctx.editor.isActive('code'),
      canBold: ctx.editor.can().setBold(),
      canItalic: ctx.editor.can().setItalic(),
      canUnderline: ctx.editor.can().setUnderline(),
      canStrike: ctx.editor.can().setStrike(),
      canCode: ctx.editor.can().setCode(),
    }),
  });

  const basicTools = [
    {
      id: 1,
      text: 'Bold',
      isActive: editorState.isBold,
      can: editorState.canBold,
      onClick: () => editor.chain().focus().toggleBold().run(),
      icon: BoldIcon,
    },
    {
      id: 2,
      text: 'Italic',
      isActive: editorState.isItalic,
      can: editorState.canItalic,
      onClick: () => editor.chain().focus().toggleItalic().run(),
      icon: ItalicIcon,
    },
    {
      id: 3,
      text: 'Underline',
      isActive: editorState.isUnderline,
      can: editorState.canUnderline,
      onClick: () => editor.chain().focus().toggleUnderline().run(),
      icon: UnderlineIcon,
    },
    {
      id: 4,
      text: 'Strike',
      isActive: editorState.isStrike,
      can: editorState.canStrike,
      onClick: () => editor.chain().focus().toggleStrike().run(),
      icon: StrikethroughIcon,
    },
    {
      id: 5,
      text: 'Code',
      isActive: editorState.isCode,
      can: editorState.canCode,
      onClick: () => editor.chain().focus().toggleCode().run(),
      icon: CodeXmlIcon,
    },
  ];

  return (
    <div className="flex gap-1">
      {basicTools.map((t) => (
        <Tooltip content={t.text} disabled={!t.can} key={t.id}>
          <Button
            size="sm"
            variant={t.isActive ? 'secondary' : 'ghost'}
            onClick={t.onClick}
            aria-label="Toggle bold"
          >
            <t.icon className="size-4" />
          </Button>
        </Tooltip>
      ))}
    </div>
  );
}
