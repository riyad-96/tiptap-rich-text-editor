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
  HeadingIcon,
} from 'lucide-react';
import { useState } from 'react';

type Level = 1 | 2 | 3 | 4 | 5 | 6;

export function ToolbarHeadings({ editor }: { editor: Editor }) {
  const [open, setOpen] = useState(false);

  const editorState = useEditorState({
    editor,
    selector: (ctx) => ({
      isH2: ctx.editor.isActive('heading', { level: 2 }),
      isH3: ctx.editor.isActive('heading', { level: 3 }),
      isH4: ctx.editor.isActive('heading', { level: 4 }),
      isH5: ctx.editor.isActive('heading', { level: 5 }),
    }),
  });

  const headings = [
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

  const activeHeading = headings.find((h) => h.isActive);

  return (
    <Popover open={open} onOpenChange={setOpen} modal>
      <PopoverTrigger asChild>
        <Button
          variant={activeHeading ? 'secondary' : 'ghost'}
          size="sm"
          className={cn('flex items-center gap-0.5 pe-1!')}
        >
          <span>
            {activeHeading ? (
              <>
                <activeHeading.icon />
              </>
            ) : (
              <HeadingIcon />
            )}
          </span>

          <ChevronDownIcon className="size-2.5" />
        </Button>
      </PopoverTrigger>

      <PopoverContent align="start" className="p-1 w-fit grid">
        {headings.map((h) => (
          <Button
            key={h.id}
            onClick={() => {
              setOpen(false);
              editor
                .chain()
                .focus()
                .toggleHeading({ level: h.id as Level })
                .run();
            }}
            variant="ghost"
            size="sm"
            className={cn(
              'flex justify-start',
              activeHeading?.id === h.id && 'bg-neutral-100',
            )}
            aria-label={h.text}
          >
            <span>{<h.icon />}</span>
            <span>{h.text}</span>
          </Button>
        ))}
      </PopoverContent>
    </Popover>
  );
}
