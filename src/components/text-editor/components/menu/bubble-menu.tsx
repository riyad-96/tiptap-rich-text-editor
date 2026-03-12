import { CodeSquareIcon, TextQuoteIcon } from 'lucide-react';
import { useEditorState } from '@tiptap/react';
import { BubbleMenu as TiptapBubbleMenu } from '@tiptap/react/menus';

import { Toggle } from '@/components/ui';
import { ToolbarLink } from '../toolbar-tools/toolbar-link';
import { ToolbarSeparator } from '../toolbar-tools/toolbar-separator';
import { ToolbarColorSelector } from '../toolbar-tools/toolbar-color-selector';
import { ToolbarCode } from '../toolbar-tools/toolbar-code';
import { ToolbarStrike } from '../toolbar-tools/toolbar-strike';
import { ToolbarUnderline } from '../toolbar-tools/toolbar-underline';
import { ToolbarItalic } from '../toolbar-tools/toolbar-italic';
import { ToolbarBold } from '../toolbar-tools/toolbar-bold';
import { ToolbarLists } from '../toolbar-tools/toolbar-lists';
import { ToolbarTextBlocks } from '../toolbar-tools/toolbar-text-blocks';
import { useEditorProvider } from '../../hooks/use-editor-provider';

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
      pluginKey={'default-bubble-menu'}
      className={
        'tiptap-bubble-menu-inner-element bg-background flex flex-wrap items-center gap-1 rounded-md border p-1 shadow-lg'
      }
      updateDelay={80}
      shouldShow={({ editor, from, to }) => {
        if (!editor.isFocused) return false;

        if (from === to) return false;

        const isImage = editor.isActive('image');
        const isPlaceholder = editor.isActive('imagePlaceholder');

        if (isImage || isPlaceholder) {
          return false;
        }

        return true;
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

      <ToolbarBold />
      <ToolbarItalic />
      <ToolbarUnderline />
      <ToolbarStrike />
      <ToolbarCode />

      <ToolbarSeparator />

      <ToolbarColorSelector />

      <ToolbarSeparator />

      <ToolbarLink />
    </TiptapBubbleMenu>
  );
}
