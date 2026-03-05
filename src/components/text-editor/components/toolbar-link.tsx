import { useRef, useState } from 'react';
import { useEditorState } from '@tiptap/react';
import {
  CornerDownLeftIcon,
  ExternalLinkIcon,
  LinkIcon,
  TrashIcon,
  UnlinkIcon,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

import { ToolbarSeparator } from './toolbar-separator';
import { Tooltip } from './tootltip';
import { useEditorProvider } from '../hooks/use-editor-provider';

export function ToolbarLink({ modal = false }: { modal?: boolean }) {
  const [linkUrl, setLinkUrl] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const { editor } = useEditorProvider();

  const editorState = useEditorState({
    editor,
    selector: (ctx) => ({
      isLink: ctx.editor.isActive('link'),
      canLink: ctx.editor.can().setLink({ href: 'https://example.com' }),
    }),
  });

  const closePopup = () => {
    setIsOpen(false);
    setLinkUrl('');
  };

  const handleSetLink = () => {
    if (linkUrl) {
      editor
        .chain()
        .focus()
        .extendMarkRange('link')
        .setLink({ href: linkUrl })
        .run();
    }
    closePopup();
  };

  const inputRef = useRef<HTMLInputElement | null>(null);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen} modal={modal}>
      {editorState.isLink ? (
        <Tooltip content={'Unlink'}>
          <Button
            variant="secondary"
            size="sm"
            aria-label="Unlink"
            onClick={() => {
              editor.chain().focus().extendMarkRange('link').unsetLink().run();
            }}
          >
            <UnlinkIcon />
          </Button>
        </Tooltip>
      ) : (
        <Tooltip content={'Link'} disabled={!editorState.canLink}>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="sm" aria-label="Link">
              <LinkIcon />
            </Button>
          </PopoverTrigger>
        </Tooltip>
      )}

      <PopoverContent className="w-fit p-1">
        <div className="flex items-center gap-1">
          <input
            ref={inputRef}
            placeholder="https://example.com"
            type="url"
            value={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSetLink();
              }
            }}
            className="px-4 py-1.5 text-sm outline-none"
          />

          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSetLink}
              disabled={!linkUrl}
            >
              <CornerDownLeftIcon />
            </Button>

            <ToolbarSeparator />

            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                window.open(linkUrl, '_blank');
              }}
              disabled={!linkUrl}
            >
              <ExternalLinkIcon />
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setLinkUrl('');
                if (inputRef.current) {
                  inputRef.current.focus();
                }
              }}
              disabled={!linkUrl}
            >
              <TrashIcon />
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
