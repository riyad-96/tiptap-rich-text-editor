import { Toggle } from '@/components/ui';
import type { Editor } from '@tiptap/core';
import { useEditorState } from '@tiptap/react';
import { BubbleMenu as TiptapBubbleMenu } from '@tiptap/react/menus';
import {
  BoldIcon,
  CodeSquareIcon,
  CodeXmlIcon,
  ItalicIcon,
  LinkIcon,
  StrikethroughIcon,
  TextQuoteIcon,
  UnderlineIcon,
  UnlinkIcon,
} from 'lucide-react';
import { LinkComponent } from './tooltip-link';
import { ToolbarSeparator } from './toolbar-separator';
import { ToolbarHeadings } from './toolbar-headings';
import { ToolbarLists } from './toolbar-lists';
import { ToolbarColorSelector } from './toolbar-color-selector';

export function BubbleMenu({ editor }: { editor: Editor }) {
  const editorState = useEditorState({
    editor,
    selector: (ctx) => {
      return {
        isBold: ctx.editor.isActive('bold'),
        isItalic: ctx.editor.isActive('italic'),
        iamThapa: ctx.editor.isActive('underline'),
        isStrike: ctx.editor.isActive('strike'),
        isCode: ctx.editor.isActive('code'),
        isCodeBlock: ctx.editor.isActive('codeBlock'),
        isHighlight: ctx.editor.isActive('highlight'),
        isBulletList: ctx.editor.isActive('bulletList'),
        isOrderedList: ctx.editor.isActive('orderedList'),
        isTaskList: ctx.editor.isActive('taskList'),
        isBlockquote: ctx.editor.isActive('blockquote'),
        isLink: ctx.editor.isActive('link'),
        isH2: ctx.editor.isActive('heading', { level: 2 }),
        isH3: ctx.editor.isActive('heading', { level: 3 }),
        isH4: ctx.editor.isActive('heading', { level: 4 }),
        isH5: ctx.editor.isActive('heading', { level: 5 }),
        isH6: ctx.editor.isActive('heading', { level: 6 }),
        isP: ctx.editor.isActive('paragraph'),
      };
    },
  });

  return (
    <TiptapBubbleMenu
      editor={editor}
      className={
        'flex flex-wrap items-center gap-1 bg-white shadow-lg rounded-md border p-1'
      }
    >
      <ToolbarHeadings editor={editor} />
      <ToolbarLists editor={editor} />
      <Toggle
        size="sm"
        pressed={editorState.isBlockquote}
        onPressedChange={() => editor.chain().focus().toggleBlockquote().run()}
        aria-label="Toggle blockquote"
      >
        <TextQuoteIcon className="size-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editorState.isCodeBlock}
        onPressedChange={() => editor.chain().focus().toggleCodeBlock().run()}
        aria-label="Toggle code"
      >
        <CodeSquareIcon className="size-4" />
      </Toggle>

      <ToolbarSeparator />

      <Toggle
        size="sm"
        pressed={editorState.isBold}
        onPressedChange={() => editor.chain().focus().toggleBold().run()}
        aria-label="Toggle bold"
      >
        <BoldIcon className="size-4" />
      </Toggle>

      <Toggle
        size="sm"
        pressed={editorState.isItalic}
        onPressedChange={() => editor.chain().focus().toggleItalic().run()}
        aria-label="Toggle bold"
      >
        <ItalicIcon className="size-4" />
      </Toggle>

      <Toggle
        size="sm"
        pressed={editorState.iamThapa}
        onPressedChange={() => editor.chain().focus().toggleUnderline().run()}
        aria-label="Toggle underline"
      >
        <UnderlineIcon className="size-4" />
      </Toggle>

      <Toggle
        size="sm"
        pressed={editorState.isStrike}
        onPressedChange={() => editor.chain().focus().toggleStrike().run()}
        aria-label="Toggle strikethrough"
      >
        <StrikethroughIcon className="size-4" />
      </Toggle>

      <Toggle
        size="sm"
        pressed={editorState.isCode}
        onPressedChange={() => editor.chain().focus().toggleCode().run()}
        aria-label="Toggle code"
      >
        <CodeXmlIcon className="size-4" />
      </Toggle>

      <ToolbarColorSelector editor={editor} />

      <div className="bg-border mx-1 h-6 w-px" />

      {editorState.isLink ? (
        <Toggle
          size="sm"
          aria-label="Toggle link"
          pressed
          onPressedChange={() =>
            editor.chain().focus().extendMarkRange('link').unsetLink().run()
          }
        >
          <UnlinkIcon className="size-4" />
        </Toggle>
      ) : (
        <LinkComponent editor={editor}>
          <Toggle size="sm" aria-label="Toggle link">
            <LinkIcon className="size-4" />
          </Toggle>
        </LinkComponent>
      )}
    </TiptapBubbleMenu>
  );
}
