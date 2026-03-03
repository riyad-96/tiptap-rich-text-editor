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

export function ToolbarColorSelector({
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
      textColor: ctx.editor.getAttributes('textStyle').color,
      highlightColor: ctx.editor.getAttributes('highlight').color,
      canColor: ctx.editor.can().chain().setColor('#fff').run(),
      canHighlight: ctx.editor
        .can()
        .chain()
        .setHighlight({ color: '#fff' })
        .run(),
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
    { id: 2, color: 'rgba(107,114,128,0.18)', text: 'Gray' },
    { id: 3, color: 'rgba(239,68,68,0.18)', text: 'Red' },
    { id: 4, color: 'rgba(249,115,22,0.18)', text: 'Orange' },
    { id: 5, color: 'rgba(234,179,8,0.20)', text: 'Yellow' },
    { id: 6, color: 'rgba(34,197,94,0.18)', text: 'Green' },
    { id: 7, color: 'rgba(6,182,212,0.18)', text: 'Cyan' },
    { id: 8, color: 'rgba(59,130,246,0.18)', text: 'Blue' },
    { id: 9, color: 'rgba(139,92,246,0.18)', text: 'Purple' },
    { id: 10, color: 'rgba(236,72,153,0.18)', text: 'Pink' },
  ];

  const activeTextColor = colors.find((c) => c.color === editorState.textColor);
  const activeHighlightColor = highlights.find(
    (h) => h.color === editorState.highlightColor,
  );

  const isColorActive = activeTextColor || activeHighlightColor;
  const canColorOrHighlight = editorState.canColor && editorState.canHighlight;

  return (
    <Popover open={open} onOpenChange={setOpen} modal={modal}>
      <PopoverTrigger asChild disabled={!canColorOrHighlight}>
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
                  variant={
                    activeTextColor?.color === c.color ? 'secondary' : 'ghost'
                  }
                  className={cn(
                    'flex items-center justify-start gap-2 px-2.5 h-9',
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
                  disabled={!editorState.canColor}
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
                  variant={
                    activeHighlightColor?.color === h.color
                      ? 'secondary'
                      : 'ghost'
                  }
                  className={cn(
                    'flex items-center justify-start gap-2 px-2.5 h-9',
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
                  disabled={!editorState.canHighlight}
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
