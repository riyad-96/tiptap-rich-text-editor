import { Button } from '@/components/ui/button';
import { useEditorProvider } from '../hooks/use-editor-provider';
import { ImagePlusIcon } from 'lucide-react';
import { Tooltip } from './tooltip';

export function ToolbarImage() {
  const { editor } = useEditorProvider();

  return (
    <Tooltip content="Add image">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => {
          editor.chain().focus().insertImagePlaceholder().run();
        }}
      >
        <ImagePlusIcon />
        <span>Add</span>
      </Button>
    </Tooltip>
  );
}
