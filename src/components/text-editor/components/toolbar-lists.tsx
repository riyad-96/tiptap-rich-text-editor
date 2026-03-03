import { type Editor, useEditorState } from '@tiptap/react';
import {
  ChevronDownIcon,
  ListIcon,
  ListOrderedIcon,
  ListTodoIcon,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { useState } from 'react';

export function ToolbarLists({ editor }: { editor: Editor }) {
  const [open, setOpen] = useState(false);

  const editorState = useEditorState({
    editor,
    selector: (ctx) => ({
      isBulletList: ctx.editor.isActive('bulletList'),
      isOrderedList: ctx.editor.isActive('orderedList'),
      isTaskList: ctx.editor.isActive('taskList'),
    }),
  });

  const lists = [
    {
      id: 1,
      icon: ListIcon,
      onClick: () => editor.chain().focus().toggleBulletList().run(),
      text: 'Bullet List',
      isActive: editorState.isBulletList,
    },
    {
      id: 2,
      icon: ListOrderedIcon,
      onClick: () => editor.chain().focus().toggleOrderedList().run(),
      text: 'Ordered List',
      isActive: editorState.isOrderedList,
    },
    {
      id: 3,
      icon: ListTodoIcon,
      onClick: () => editor.chain().focus().toggleTaskList().run(),
      text: 'Todo List',
      isActive: editorState.isTaskList,
    },
  ];

  const activeList = lists.find((h) => h.isActive);

  return (
    <Popover open={open} onOpenChange={setOpen} modal>
      <PopoverTrigger asChild>
        <Button
          variant={activeList ? 'secondary' : 'ghost'}
          size="sm"
          className={cn('flex items-center gap-0.5 pe-1!')}
        >
          <span>
            {activeList ? (
              <>
                <activeList.icon />
              </>
            ) : (
              <ListIcon />
            )}
          </span>

          <ChevronDownIcon className="size-2.5" />
        </Button>
      </PopoverTrigger>

      <PopoverContent align="start" className="p-1 w-fit grid">
        {lists.map((l) => (
          <Button
            key={l.id}
            onClick={() => {
              l.onClick();
              setOpen(false);
            }}
            variant="ghost"
            size="sm"
            className={cn(
              'flex justify-start',
              activeList?.id === l.id && 'bg-neutral-100',
            )}
            aria-label={l.text}
          >
            <span>{<l.icon />}</span>
            <span>{l.text}</span>
          </Button>
        ))}
      </PopoverContent>
    </Popover>
  );
}
