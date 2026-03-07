import { BubbleMenu } from '@tiptap/react/menus';
import { useEditorProvider } from '../../hooks/use-editor-provider';
import { Button } from '@/components/ui/button';
import { XIcon } from 'lucide-react';
import { Tooltip } from '../../components/tooltip';

export function ImageBubbleMenu() {
  const { editor } = useEditorProvider();

  return (
    <BubbleMenu
      editor={editor}
      shouldShow={({ editor }) => editor.isActive('image')}
      className={
        'tiptap-bubble-menu-inner-element bg-background flex flex-wrap items-center gap-1 rounded-md border shadow-lg'
      }
    >
      <Tooltip content="Remove image" side="top">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            editor.chain().deleteSelection().run();
          }}
        >
          <XIcon className="size-4" />
        </Button>
      </Tooltip>
    </BubbleMenu>
  );
}
