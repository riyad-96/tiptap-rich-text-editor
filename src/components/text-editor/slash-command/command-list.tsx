import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { SuggestionItem } from '../types/slash-command';
import { Button } from '@/components/ui/button';

export interface CommandListProps {
  items: SuggestionItem[];
  command: (item: SuggestionItem) => void;
}

export const CommandList = forwardRef((props: CommandListProps, ref) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const el = container.children[selectedIndex] as HTMLElement | undefined;
    el?.scrollIntoView({
      block: 'nearest',
    });
  }, [selectedIndex]);

  const selectItem = (index: number) => {
    const item = props.items[index];
    if (item) {
      props.command(item);
    }
  };

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setSelectedIndex(0), [props.items]);

  useImperativeHandle(ref, () => ({
    onKeyDown: ({ event }: { event: KeyboardEvent }) => {
      if (event.key === 'ArrowUp') {
        setSelectedIndex(
          (selectedIndex + props.items.length - 1) % props.items.length,
        );
        return true;
      }

      if (event.key === 'ArrowDown') {
        setSelectedIndex((selectedIndex + 1) % props.items.length);
        return true;
      }

      if (event.key === 'Enter') {
        selectItem(selectedIndex);
        return true;
      }

      return false;
    },
  }));

  return (
    <div
      ref={containerRef}
      className="bg-popover border-border z-50 grid max-h-82.5 w-60 scroll-py-1 overflow-y-auto rounded-md border p-1 shadow-md"
    >
      {props.items.length ? (
        props.items.map((item, index) => (
          <Button
            key={index}
            onClick={() => selectItem(index)}
            className={`flex h-fit items-center justify-start gap-2 rounded-md px-2 text-start`}
            variant={index === selectedIndex ? 'secondary' : 'ghost'}
          >
            <span className="flex size-9 shrink-0 items-center justify-center rounded-md border">
              <item.icon className="h-4 w-4" />
            </span>
            <span className="grid">
              <span className="font-medium">{item.title}</span>
              <span className="text-xs text-balance text-neutral-500">
                {item.description}
              </span>
            </span>
          </Button>
        ))
      ) : (
        <div className="px-2 py-1.5 text-sm text-neutral-500">
          No results found
        </div>
      )}
    </div>
  );
});

CommandList.displayName = 'CommandList';
