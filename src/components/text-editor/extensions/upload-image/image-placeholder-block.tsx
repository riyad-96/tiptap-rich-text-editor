import React, { useRef, useState } from 'react';
import { NodeViewWrapper, type NodeViewProps } from '@tiptap/react';
import { ImageIcon, Upload, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const ImagePlaceholderBlock = ({
  editor,
  getPos,
  deleteNode,
}: NodeViewProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);

    try {
      // Replace with your actual upload logic (e.g., S3/Vercel Blob)
      const url = URL.createObjectURL(file);

      // Replace this placeholder node with the actual image node
      editor
        .chain()
        .focus()
        .insertContentAt(getPos() as number, {
          type: 'image',
          attrs: { src: url, alt: file.name },
        })
        .run();
      deleteNode();
    } catch (error) {
      console.error(error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <NodeViewWrapper className="my-4">
      <div className="group relative flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-neutral-200 bg-neutral-50/50 p-8 transition-colors hover:border-neutral-400 hover:bg-neutral-50">
        <Button
          onClick={deleteNode}
          className="absolute top-2 right-2 rounded-md p-1 opacity-0 group-hover:opacity-100"
          variant={'outline'}
          size="icon-sm"
        >
          <X className="h-4 w-4" />
        </Button>

        <div className="flex flex-col items-center gap-4 text-center select-none">
          <div className="rounded-full bg-white p-3 shadow-sm ring-1 ring-neutral-200">
            <ImageIcon className="h-6 w-6 text-neutral-500" />
          </div>

          <div>
            <p className="text-sm font-medium text-neutral-900">Add an image</p>
            <p className="text-xs text-neutral-500">
              Upload from computer or paste a link
            </p>
          </div>

          <div className="flex gap-2">
            <Button
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
              size="sm"
            >
              <Upload className="h-4 w-4" />
              {isUploading ? 'Uploading...' : 'Upload File'}
            </Button>
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>
        </div>
      </div>
    </NodeViewWrapper>
  );
};
