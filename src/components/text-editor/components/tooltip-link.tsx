import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { type Editor } from '@tiptap/core';
import { useState } from 'react';

export function LinkComponent({
  editor,
  children,
}: {
  editor: Editor;
  children: React.ReactNode;
}) {
  const [linkUrl, setLinkUrl] = useState('');
  const [isLinkPopoverOpen, setIsLinkPopoverOpen] = useState(false);

  const handleSetLink = () => {
    if (linkUrl) {
      editor
        .chain()
        .focus()
        .extendMarkRange('link')
        .setLink({ href: linkUrl })
        .run();
    } else {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
    }
    setIsLinkPopoverOpen(false);
    setLinkUrl('');
  };

  return (
    <Popover open={isLinkPopoverOpen} onOpenChange={setIsLinkPopoverOpen}>
      <PopoverTrigger asChild>{children}</PopoverTrigger>

      <PopoverContent className="w-80 p-4">
        <div className="flex flex-col gap-4">
          <h3 className="font-medium">Insert Link</h3>
          <Input
            placeholder="https://example.com"
            type="url"
            value={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSetLink();
              }
            }}
          />
          <div className="flex justify-between">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsLinkPopoverOpen(false)}
            >
              Cancel
            </Button>
            <Button size="sm" onClick={handleSetLink}>
              Save
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
