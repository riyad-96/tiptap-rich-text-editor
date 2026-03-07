import { CodeSquareIcon, TextQuoteIcon } from 'lucide-react';
import { useEditorState } from '@tiptap/react';
import { BubbleMenu as TiptapBubbleMenu } from '@tiptap/react/menus';
import { TextSelection } from '@tiptap/pm/state';

import { Toggle } from '@/components/ui';

import { ToolbarSeparator } from './toolbar-separator';
import { ToolbarTextBlocks } from './toolbar-text-blocks';
import { ToolbarLists } from './toolbar-lists';
import { ToolbarColorSelector } from './toolbar-color-selector';
import { ToolbarLink } from './toolbar-link';
import { ToolbarBasicTools } from './toolbar-basic-tools';
import { useEditorProvider } from '../hooks/use-editor-provider';

export function BubbleMenu() {
  const { editor, isBubbleMenuHidden } = useEditorProvider();

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

  if (isBubbleMenuHidden) return <></>;

  return (
    <TiptapBubbleMenu
      editor={editor}
      className={
        'tiptap-bubble-menu-inner-element bg-background flex flex-wrap items-center gap-1 rounded-md border p-1 shadow-lg'
      }
      updateDelay={80}
      shouldShow={({ editor, view, state, from, to }) => {
        if (!editor.isFocused) return false;

        if (from === to) return false;

        const isImage = editor.isActive('image');
        const isPlaceholder = editor.isActive('imagePlaceholder');

        if (isImage || isPlaceholder) {
          return false;
        }

        return (
          editor.state.selection instanceof TextSelection ||
          editor.isActive('paragraph')
        );
      }}
    >
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
    </TiptapBubbleMenu>
  );
}
