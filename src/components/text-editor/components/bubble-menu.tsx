import { CodeSquareIcon, TextQuoteIcon } from 'lucide-react';
import type { Editor } from '@tiptap/core';
import { useEditorState } from '@tiptap/react';
import { BubbleMenu as TiptapBubbleMenu } from '@tiptap/react/menus';

import { Toggle } from '@/components/ui';

import { ToolbarSeparator } from './toolbar-separator';
import { ToolbarTextBlocks } from './toolbar-text-blocks';
import { ToolbarLists } from './toolbar-lists';
import { ToolbarColorSelector } from './toolbar-color-selector';
import { ToolbarLink } from './toolbar-link';
import { ToolbarBasicTools } from './toolbar-basic-tools';

export function BubbleMenu({ editor }: { editor: Editor }) {
  const editorState = useEditorState({
    editor,
    selector: (ctx) => {
      return {
        isCodeBlock: ctx.editor.isActive('codeBlock'),
        isBlockQuote: ctx.editor.isActive('blockquote'),
        canBlockQuote: ctx.editor.can().toggleBlockquote(),
      };
    },
  });

  return (
    <TiptapBubbleMenu
      editor={editor}
      className={
        'tiptap-bubble-menu-inner-element flex flex-wrap items-center gap-1 bg-background shadow-lg rounded-md border p-1'
      }
      updateDelay={80}
    >
      <ToolbarTextBlocks editor={editor} />
      <ToolbarLists editor={editor} />

      <Toggle
        size="sm"
        pressed={editorState.isBlockQuote}
        onPressedChange={() => editor.chain().focus().toggleBlockquote().run()}
        aria-label="Toggle blockquote"
        disabled={!editorState.canBlockQuote}
      >
        <TextQuoteIcon className="size-4" />
      </Toggle>

      <Toggle
        size="sm"
        pressed={editorState.isCodeBlock}
        onPressedChange={() => editor.chain().focus().toggleCodeBlock().run()}
        aria-label="Toggle code block"
      >
        <CodeSquareIcon className="size-4" />
      </Toggle>

      <ToolbarSeparator />

      <ToolbarBasicTools editor={editor} />

      <ToolbarSeparator />

      <ToolbarColorSelector editor={editor} />

      <ToolbarSeparator />

      <ToolbarLink editor={editor} />
    </TiptapBubbleMenu>
  );
}
