import { Toggle } from '@/components/ui';

import { type Editor, useEditorState } from '@tiptap/react';
import { CodeSquareIcon, TextQuoteIcon } from 'lucide-react';
import { ToolbarLink } from './toolbar-link';
import { ToolbarTextBlocks } from './toolbar-text-blocks';
import { ToolbarSeparator } from './toolbar-separator';
import { ToolbarLists } from './toolbar-lists';
import { ToolbalUndoRedo } from './toolbar-undo-redo';
import { ToolbarColorSelector } from './toolbar-color-selector';
import { ToolbarAlign } from './toolbar-align';
import { ToolbarSupSubscript } from './toolbar-super-sub-script';
import { ToolbarBasicTools } from './toolbar-basic-tools';

export function ToolBar({ editor }: { editor: Editor }) {
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
    <div
      className={
        'bg-background sticky top-0 flex min-w-0 items-center gap-1 overflow-x-auto border-b p-2'
      }
    >
      <ToolbalUndoRedo editor={editor} />

      <ToolbarSeparator />

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

      <ToolbarSeparator />

      <ToolbarAlign editor={editor} />

      <ToolbarSeparator />

      <ToolbarSupSubscript editor={editor} />
    </div>
  );
}
