import { Toggle } from '@/components/ui';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { type Editor, useEditorState } from '@tiptap/react';
import {
  BoldIcon,
  CodeIcon,
  CodeSquareIcon,
  CodeXmlIcon,
  HighlighterIcon,
  ItalicIcon,
  LinkIcon,
  ListIcon,
  ListOrderedIcon,
  ListTodoIcon,
  QuoteIcon,
  RedoIcon,
  StrikethroughIcon,
  UnderlineIcon,
  UndoIcon,
  UnlinkIcon,
} from 'lucide-react';
import { LinkComponent } from './link';

type Level = 2 | 3 | 4 | 5 | 6;

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
        isLink: ctx.editor.isActive('link'),
        canRedo: editor.can().redo(),
        canUndo: editor.can().undo(),
        isHeading2: ctx.editor.isActive('heading', { level: 2 }),
        isHeading3: ctx.editor.isActive('heading', { level: 3 }),
        isHeading4: ctx.editor.isActive('heading', { level: 4 }),
        isHeading5: ctx.editor.isActive('heading', { level: 5 }),
        isHeading6: ctx.editor.isActive('heading', { level: 6 }),
        isParagraph: ctx.editor.isActive('paragraph'),
      };
    },
  });

  const handleHeadingChange = (value: string) => {
    if (value === 'paragraph') {
      editor.chain().focus().setParagraph().run();
    } else {
      const level = Number.parseInt(value.replace('heading', '')) as Level;
      editor.chain().focus().setHeading({ level }).run();
    }
  };

  return (
    <div className={'flex flex-wrap items-center gap-1 border-b p-2'}>
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
          <SelectValue placeholder="Paragraph" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="paragraph">Paragraph</SelectItem>
          <SelectItem value="heading2">Heading 1</SelectItem>
          <SelectItem value="heading3">Heading 2</SelectItem>
          <SelectItem value="heading4">Heading 3</SelectItem>
          <SelectItem value="heading5">Heading 4</SelectItem>
          <SelectItem value="heading6">Heading 5</SelectItem>
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
        <CodeXmlIcon className="size-4" />
      </Toggle>

      <Toggle
        size="sm"
        pressed={editorState.isCodeBlock}
        onPressedChange={() => editor.chain().focus().toggleCodeBlock().run()}
        aria-label="Toggle code"
      >
        <CodeSquareIcon className="size-4" />
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
        pressed={editorState.isTaskList}
        onPressedChange={() => editor.chain().focus().toggleTaskList().run()}
        aria-label="Toggle ordered list"
      >
        <ListTodoIcon className="size-4" />
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

      <div className="bg-border mx-1 h-6 w-px" />

      <div className="bg-border mx-1 h-6 w-px" />

      <Button
        type="button"
        size="sm"
        variant="ghost"
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editorState.canUndo}
        aria-label="Undo"
      >
        <UndoIcon className="size-4" />
      </Button>

      <Button
        type="button"
        size="sm"
        variant="ghost"
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editorState.canRedo}
        aria-label="Redo"
      >
        <RedoIcon className="size-4" />
      </Button>
    </div>
  );
}
