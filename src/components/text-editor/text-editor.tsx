'use client';

import { useEffect, useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';

import { BubbleMenu } from './components/bubble-menu';
import { ToolBar } from './components/toolbar';
import { tiptapExtensions } from './extensions';
import { TooltipProvider } from '../ui/tooltip';
import { tiptapStyleClasses } from './style';
import { editorContext } from './context/editor-context';
import { useEditorProvider } from './hooks/use-editor-provider';
import { TextEditorProps } from './types/text-editor';
import { ImageBubbleMenu } from './extensions/upload-image/image-bubble';

export function TextEditor({
  hideBubbleMenuOnTouch = true,
  content,
  onChange,
  placeholder,
  hideTooltip = false,
}: TextEditorProps) {
  const editor = useEditor({
    extensions: tiptapExtensions({ placeholder }),
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: tiptapStyleClasses,
      },
    },
    onMount: (props) => {
      if (typeof onChange === 'function') onChange(props.editor);
    },
    onUpdate: (v) => {
      if (typeof onChange == 'function') onChange(v.editor);
    },
    content,
  });

  const [isBubbleMenuHidden, setIsBubbleMenuHidden] = useState(false);

  useEffect(() => {
    if (hideBubbleMenuOnTouch) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsBubbleMenuHidden(window.matchMedia('(pointer: coarse)').matches);
    }
  }, [hideBubbleMenuOnTouch]);

  if (!editor) return <></>;

  return (
    <editorContext.Provider
      value={{
        editor,
        isBubbleMenuHidden,
        hideTooltip,
      }}
    >
      <TooltipProvider>
        <EditorContentWrapper />
      </TooltipProvider>
    </editorContext.Provider>
  );
}

function EditorContentWrapper() {
  const { editor } = useEditorProvider();

  return (
    <>
      <EditorContent
        editor={editor}
        className="text-primary grid h-full grid-rows-[auto_1fr] overflow-y-auto"
        spellCheck={false}
      >
        <ToolBar />
      </EditorContent>

      <BubbleMenu />
      <ImageBubbleMenu />
    </>
  );
}
