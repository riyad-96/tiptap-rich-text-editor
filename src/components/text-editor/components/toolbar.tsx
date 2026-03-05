import { useEditorState } from '@tiptap/react';
import { CodeSquareIcon, TextQuoteIcon } from 'lucide-react';

import { Toggle } from '@/components/ui';

import { ToolbarLink } from './toolbar-link';
import { ToolbarTextBlocks } from './toolbar-text-blocks';
import { ToolbarSeparator } from './toolbar-separator';
import { ToolbarLists } from './toolbar-lists';
import { ToolbalUndoRedo } from './toolbar-undo-redo';
import { ToolbarColorSelector } from './toolbar-color-selector';
import { ToolbarAlign } from './toolbar-align';
import { ToolbarSupSubscript } from './toolbar-super-sub-script';
import { ToolbarBasicTools } from './toolbar-basic-tools';
import { useEditorProvider } from '../hooks/use-editor-provider';

export function ToolBar() {
  const { editor } = useEditorProvider();

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
        'bg-background flex min-w-0 items-center gap-1 overflow-x-auto border-b p-2'
      }
    >
      <ToolbalUndoRedo />

      <ToolbarSeparator />

      <ToolbarTextBlocks />
      <ToolbarLists />

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

      <ToolbarBasicTools />

      <ToolbarSeparator />

      <ToolbarColorSelector />

      <ToolbarSeparator />

      <ToolbarLink />

      <ToolbarSeparator />

      <ToolbarAlign />

      <ToolbarSeparator />

      <ToolbarSupSubscript />
    </div>
  );
}
