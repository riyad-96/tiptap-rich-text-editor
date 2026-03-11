import { BubbleMenu } from '@tiptap/react/menus';
import { useEditorProvider } from '../../hooks/use-editor-provider';
import { Button } from '@/components/ui/button';
import {
  AlignCenterIcon,
  AlignLeftIcon,
  AlignRightIcon,
  MaximizeIcon,
  XIcon,
} from 'lucide-react';
import { Tooltip } from '../../components/tooltip';
import { useEditorState } from '@tiptap/react';

export function ImageBubbleMenu() {
  const { editor } = useEditorProvider();

  const editorState = useEditorState({
    editor,
    selector: (ctx) => ({
      isAlignLeft: ctx.editor.isActive('image', { align: 'left' }),
      isAlignCenter: ctx.editor.isActive('image', { align: 'center' }),
      isAlignRight: ctx.editor.isActive('image', { align: 'right' }),
      isFullWidth: ctx.editor.isActive('image', { width: '100%' }),
    }),
  });

  const setAlign = (align: 'left' | 'center' | 'right') => {
    const isAlreadyAligned = editor.isActive('image', { align });
    editor.chain().focus().setImageAlign(isAlreadyAligned ? null : align).run();
  };

  return (
    <BubbleMenu
      editor={editor}
      pluginKey={'image-bubble-menu'}
      shouldShow={({ editor }) => editor.isActive('image')}
      className={
        'tiptap-bubble-menu-inner-element bg-background flex flex-wrap items-center gap-1 rounded-md border p-1 shadow-lg'
      }
    >
      <Tooltip content="Align Left" side="top">
        <Button
          variant={editorState.isAlignLeft ? 'secondary' : 'ghost'}
          size="sm"
          onClick={() => setAlign('left')}
          type="button"
        >
          <AlignLeftIcon className="size-4" />
        </Button>
      </Tooltip>

      <Tooltip content="Align Center" side="top">
        <Button
          variant={editorState.isAlignCenter ? 'secondary' : 'ghost'}
          size="sm"
          onClick={() => setAlign('center')}
          type="button"
        >
          <AlignCenterIcon className="size-4" />
        </Button>
      </Tooltip>

      <Tooltip content="Align Right" side="top">
        <Button
          variant={editorState.isAlignRight ? 'secondary' : 'ghost'}
          size="sm"
          onClick={() => setAlign('right')}
          type="button"
        >
          <AlignRightIcon className="size-4" />
        </Button>
      </Tooltip>

      <div className="bg-border mx-1 h-4 w-px" />

      <Tooltip content="Full Width" side="top">
        <Button
          variant={editorState.isFullWidth ? 'secondary' : 'ghost'}
          size="sm"
          onClick={() => editor.chain().focus().setImageFullWidth().run()}
          type="button"
        >
          <MaximizeIcon className="size-4" />
        </Button>
      </Tooltip>

      <Tooltip content="Remove image" side="top">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            editor.chain().deleteSelection().run();
          }}
          type="button"
        >
          <XIcon className="size-4" />
        </Button>
      </Tooltip>
    </BubbleMenu>
  );
}
