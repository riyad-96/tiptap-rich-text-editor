import { Toggle } from '@/components/ui';

import { type Editor, useEditorState } from '@tiptap/react';
import {
  BoldIcon,
  CodeSquareIcon,
  CodeXmlIcon,
  ItalicIcon,
  StrikethroughIcon,
  TextQuoteIcon,
  UnderlineIcon,
} from 'lucide-react';
import { ToolbarLink } from './toolbar-link';
import { ToolbarHeadings } from './toolbar-headings';
import { ToolbarSeparator } from './toolbar-separator';
import { ToolbarLists } from './toolbar-lists';
import { ToolbalUndoRedo } from './toolbar-undo-redo';
import { ToolbarColorSelector } from './toolbar-color-selector';
import { ToolbarAlign } from './toolbar-align';
import { ToolbarSupSubscript } from './toolbar-super-sub-script';

export function ToolBar({ editor }: { editor: Editor }) {
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
        canRedo: editor.can().redo(),
        canUndo: editor.can().undo(),
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
    <div
      className={'sticky top-0 flex flex-wrap items-center gap-1 border-b p-2'}
    >
      <ToolbalUndoRedo editor={editor} />

      <ToolbarSeparator />

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

      <ToolbarLink editor={editor} />

      <ToolbarSeparator />

      <ToolbarAlign editor={editor} />

      <ToolbarSeparator />

      <ToolbarSupSubscript editor={editor} />
    </div>
  );
}
