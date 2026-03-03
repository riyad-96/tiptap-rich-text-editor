import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { type Editor, useEditorState } from '@tiptap/react';
import {
  ChevronDownIcon,
  Heading1Icon,
  Heading2Icon,
  Heading3Icon,
  Heading4Icon,
  PilcrowIcon,
  TypeIcon,
} from 'lucide-react';
import { useState } from 'react';

export function ToolbarTextBlocks({
  editor,
  modal = false,
}: {
  editor: Editor;
  modal?: boolean;
}) {
  const [open, setOpen] = useState(false);

  const editorState = useEditorState({
    editor,
    selector: (ctx) => ({
      isP: ctx.editor.isActive('paragraph'),
      isH2: ctx.editor.isActive('heading', { level: 2 }),
      isH3: ctx.editor.isActive('heading', { level: 3 }),
      isH4: ctx.editor.isActive('heading', { level: 4 }),
      isH5: ctx.editor.isActive('heading', { level: 5 }),
    }),
  });

  const textBlocks = [
    {
      id: 1,
      icon: PilcrowIcon,
      onClick: () => editor.chain().focus().setParagraph().run(),
      text: 'Paragraph',
      isActive: editorState.isP,
    },
    {
      id: 2,
      icon: Heading1Icon,
      onClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      text: 'Heading 1',
      isActive: editorState.isH2,
    },
    {
      id: 3,
      icon: Heading2Icon,
      onClick: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
      text: 'Heading 2',
      isActive: editorState.isH3,
    },
    {
      id: 4,
      icon: Heading3Icon,
      onClick: () => editor.chain().focus().toggleHeading({ level: 4 }).run(),
      text: 'Heading 3',
      isActive: editorState.isH4,
    },
    {
      id: 5,
      icon: Heading4Icon,
      onClick: () => editor.chain().focus().toggleHeading({ level: 5 }).run(),
      text: 'Heading 4',
      isActive: editorState.isH5,
    },
  ];

  const activeBlock = textBlocks.find((b) => b.isActive);

  return (
    <Popover open={open} onOpenChange={setOpen} modal={modal}>
      <PopoverTrigger asChild>
        <Button
          variant={activeBlock ? 'secondary' : 'ghost'}
          size="sm"
          className={cn('flex items-center gap-0.5 pe-1!')}
        >
          <span>
            {activeBlock ? (
              <>
                <activeBlock.icon />
              </>
            ) : (
              <TypeIcon />
            )}
          </span>

          <ChevronDownIcon className="size-2.5" />
        </Button>
      </PopoverTrigger>

      <PopoverContent align="start" className="grid w-fit p-1">
        {textBlocks.map((b) => (
          <Button
            key={b.id}
            onClick={() => {
              setOpen(false);
              b.onClick();
            }}
            variant={activeBlock?.id === b.id ? 'secondary' : 'ghost'}
            size="sm"
            className={cn('flex justify-start')}
            aria-label={b.text}
          >
            <span>{<b.icon />}</span>
            <span>{b.text}</span>
          </Button>
        ))}
      </PopoverContent>
    </Popover>
  );
}
