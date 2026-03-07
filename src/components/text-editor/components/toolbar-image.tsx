import { Button } from '@/components/ui/button';
import { addImage } from '../extensions/upload-image';
import { useEditorProvider } from '../hooks/use-editor-provider';

export function ToolbarImage() {
  const { editor } = useEditorProvider();

  return (
    <Button variant="ghost" size="sm" onClick={() => addImage(editor)}>
      Add image
    </Button>
  );
}
