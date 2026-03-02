import { Toggle } from '@/components/ui';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { Editor } from '@tiptap/core';
import { useEditorState } from '@tiptap/react';
import { BubbleMenu as TiptapBubbleMenu } from '@tiptap/react/menus';
import {
  BoldIcon,
  CodeIcon,
  HighlighterIcon,
  ItalicIcon,
  LinkIcon,
  ListIcon,
  ListOrderedIcon,
  QuoteIcon,
  StrikethroughIcon,
  UnderlineIcon,
  UnlinkIcon,
} from 'lucide-react';
import { LinkComponent } from './link';

export function BubbleMenu({ editor }: { editor: Editor }) {
  const editorState = useEditorState({
    editor,
    selector: (ctx) => {
      return {
        isBold: ctx.editor.isActive('bold') ?? false,
        isItalic: ctx.editor.isActive('italic') ?? false,
        iamThapa: ctx.editor.isActive('underline') ?? false,
        isStrike: ctx.editor.isActive('strike') ?? false,
        isCode: ctx.editor.isActive('code') ?? false,
        isHighlight: ctx.editor.isActive('highlight') ?? false,
        isBulletList: ctx.editor.isActive('bulletList') ?? false,
        isOrderedList: ctx.editor.isActive('orderedList') ?? false,
        isBlockquote: ctx.editor.isActive('blockquote') ?? false,
        isLink: ctx.editor.isActive('link') ?? false,
        canRedo: editor.can().redo(),
        canUndo: editor.can().undo(),
        isHeading2: ctx.editor.isActive('heading', { level: 2 }) ?? false,
        isHeading3: ctx.editor.isActive('heading', { level: 3 }) ?? false,
        isHeading4: ctx.editor.isActive('heading', { level: 4 }) ?? false,
        isHeading5: ctx.editor.isActive('heading', { level: 5 }) ?? false,
        isHeading6: ctx.editor.isActive('heading', { level: 6 }) ?? false,
        isParagraph: ctx.editor.isActive('paragraph') ?? false,
      };
    },
  });

  const handleHeadingChange = (value: string) => {
    if (value === 'paragraph') {
      editor.chain().focus().setParagraph().run();
    } else {
      const level = Number.parseInt(value.replace('heading', '')) as
        | 1
        | 2
        | 3
        | 4
        | 5
        | 6;
      editor.chain().focus().setHeading({ level }).run();
    }
  };

  return (
    <TiptapBubbleMenu
      editor={editor}
      className="bg-white border flex items-center gap-1 rounded-lg shadow-lg p-1"
    >
      <Select
        onValueChange={handleHeadingChange}
        value={
          editorState.isHeading2
            ? 'heading2'
            : editorState.isHeading3
              ? 'heading3'
              : editorState.isHeading4
                ? 'heading4'
                : editorState.isHeading5
                  ? 'heading5'
                  : editorState.isHeading6
                    ? 'heading6'
                    : 'paragraph'
        }
      >
        <SelectTrigger className="w-45">
          <SelectValue placeholder="P" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="paragraph">P</SelectItem>
          <SelectItem value="heading2">H1</SelectItem>
          <SelectItem value="heading3">H2</SelectItem>
          <SelectItem value="heading4">H3</SelectItem>
          <SelectItem value="heading5">H4</SelectItem>
          <SelectItem value="heading6">H5</SelectItem>
        </SelectContent>
      </Select>

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
        pressed={editorState.isHighlight}
        onPressedChange={() =>
          editor.chain().focus().toggleHighlight({ color: '#fdeb80' }).run()
        }
        aria-label="Toggle highlight"
      >
        <HighlighterIcon className="size-4" />
      </Toggle>

      <Toggle
        size="sm"
        pressed={editorState.isCode}
        onPressedChange={() => editor.chain().focus().toggleCode().run()}
        aria-label="Toggle code"
      >
        <CodeIcon className="size-4" />
      </Toggle>

      <Toggle
        size="sm"
        pressed={editorState.isBulletList}
        onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
        aria-label="Toggle bullet list"
      >
        <ListIcon className="size-4" />
      </Toggle>

      <Toggle
        size="sm"
        pressed={editorState.isOrderedList}
        onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}
        aria-label="Toggle ordered list"
      >
        <ListOrderedIcon className="size-4" />
      </Toggle>

      <Toggle
        size="sm"
        pressed={editorState.isBlockquote}
        onPressedChange={() => editor.chain().focus().toggleBlockquote().run()}
        aria-label="Toggle blockquote"
      >
        <QuoteIcon className="size-4" />
      </Toggle>

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
