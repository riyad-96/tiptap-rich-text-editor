import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { type Editor } from '@tiptap/core';
import { useEditorState } from '@tiptap/react';
import { ChevronDownIcon, PaletteIcon } from 'lucide-react';
import { useState } from 'react';

export function ToolbarColorSelector({ editor }: { editor: Editor }) {
  const [open, setOpen] = useState(false);

  const editorState = useEditorState({
    editor,
    selector: (ctx) => ({
      textColor: ctx.editor.getAttributes('textStyle').color,
      highlightColor: ctx.editor.getAttributes('highlight').color,
    }),
  });

  const colors = [
    { id: 1, color: '', text: 'Default' },
    { id: 2, color: '#374151', text: 'Gray' },
    { id: 3, color: '#dc2626', text: 'Red' },
    { id: 4, color: '#ea580c', text: 'Orange' },
    { id: 5, color: '#ca8a04', text: 'Yellow' },
    { id: 6, color: '#16a34a', text: 'Green' },
    { id: 7, color: '#0891b2', text: 'Cyan' },
    { id: 8, color: '#2563eb', text: 'Blue' },
    { id: 9, color: '#7c3aed', text: 'Purple' },
    { id: 10, color: '#be185d', text: 'Pink' },
  ];
  const highlights = [
    { id: 1, color: '', text: 'Default' },
    { id: 2, color: '#e5e7eb', text: 'Gray' },
    { id: 3, color: '#fee2e2', text: 'Red' },
    { id: 4, color: '#ffedd5', text: 'Orange' },
    { id: 5, color: '#fef9c3', text: 'Yellow' },
    { id: 6, color: '#dcfce7', text: 'Green' },
    { id: 7, color: '#cffafe', text: 'Cyan' },
    { id: 8, color: '#dbeafe', text: 'Blue' },
    { id: 9, color: '#ede9fe', text: 'Purple' },
    { id: 10, color: '#fce7f3', text: 'Pink' },
  ];

  const activeTextColor = colors.find((c) => c.color === editorState.textColor);
  const activeHighlightColor = highlights.find(
    (h) => h.color === editorState.highlightColor,
  );

  const isColorActive = activeTextColor || activeHighlightColor;

  return (
    <Popover open={open} onOpenChange={setOpen} modal>
      <PopoverTrigger asChild>
        <Button
          variant={isColorActive ? 'secondary' : 'ghost'}
          size="sm"
          className={cn('flex items-center gap-0.5 pe-1!')}
        >
          <PaletteIcon />
          <ChevronDownIcon className="size-2.5" />
        </Button>
      </PopoverTrigger>

      <PopoverContent align="start" className="p-0 w-fit overflow-hidden">
        <div className="p-1 py-2 space-y-2.5 min-w-37.5 max-h-62.5 overflow-y-auto">
          <div className="grid gap-1">
            <span className="text-neutral-700 px-2.5 text-xs">Colors</span>
            <div className="grid">
              {colors.map((c) => (
                <Button
                  key={c.id}
                  size="sm"
                  variant="ghost"
                  className={cn(
                    'flex items-center justify-start gap-2 px-2.5 h-9',
                    activeTextColor?.color === c.color && 'bg-neutral-100',
                  )}
                  aria-label={c.text}
                  onClick={() => {
                    if (c.color) {
                      editor.chain().focus().setColor(c.color).run();
                    } else {
                      editor
                        .chain()
                        .focus()
                        .setColor('var(--editor-default-text-clr)')
                        .run();
                    }
                    setOpen(false);
                  }}
                >
                  <span
                    className="size-6 border rounded-sm grid place-items-center"
                    style={{ color: c.color }}
                  >
                    A
                  </span>
                  <span>{c.text}</span>
                </Button>
              ))}
            </div>
          </div>

          <div className="grid gap-1">
            <span className="text-neutral-700 px-2.5 text-xs">Highlights</span>
            <div className="grid">
              {highlights.map((h) => (
                <Button
                  key={h.id}
                  size="sm"
                  variant="ghost"
                  className={cn(
                    'flex items-center justify-start gap-2 px-2.5 h-9',
                    activeHighlightColor?.color === h.color && 'bg-neutral-100',
                  )}
                  aria-label={h.text}
                  onClick={() => {
                    if (h.color) {
                      editor
                        .chain()
                        .focus()
                        .setHighlight({ color: h.color })
                        .run();
                    } else {
                      editor
                        .chain()
                        .focus()
                        .setHighlight({ color: 'var(--background)' })
                        .run();
                    }
                    setOpen(false);
                  }}
                >
                  <span
                    className="size-6 border rounded-sm grid place-items-center"
                    style={{ backgroundColor: h.color }}
                  >
                    A
                  </span>
                  <span>{h.text}</span>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
