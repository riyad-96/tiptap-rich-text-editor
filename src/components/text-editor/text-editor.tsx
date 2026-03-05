'use client';

import { useEffect, useState } from 'react';
import { useEditor, EditorContent, Editor, Content } from '@tiptap/react';

import { BubbleMenu } from './components/bubble-menu';
import { ToolBar } from './components/toolbar';
import { tiptapExtensions } from './extensions';
import { TooltipProvider } from '../ui/tooltip';
import { tiptapStyleClasses } from './style';

export type TextEditorProps = {
  hideBubbleMenuOnTouch?: boolean;
  content?: Content;
  onChange?: (value: Editor) => void;
  placeholder?: string | boolean;
};

export function TextEditor({
  hideBubbleMenuOnTouch = true,
  content,
  onChange,
  placeholder,
}: TextEditorProps) {
  const editor = useEditor({
    extensions: tiptapExtensions({ placeholder }),
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: tiptapStyleClasses,
      },
    },
    onMount(props) {
      if (typeof onChange === 'function') onChange(props.editor);
    },
    onUpdate: (v) => {
      if (typeof onChange == 'function') onChange(v.editor);

      // print to console
      console.log(v.editor.getHTML());
      console.log(v.editor.getJSON());
    },
    content,
  });

  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    if (hideBubbleMenuOnTouch) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsTouchDevice(window.matchMedia('(pointer: coarse)').matches);
    }
  }, [hideBubbleMenuOnTouch]);

  return (
    <TooltipProvider>
      <EditorContent
        editor={editor}
        className="text-primary grid h-full grid-rows-[auto_1fr] overflow-y-auto"
        spellCheck={false}
      >
        {editor && (
          <>
            <ToolBar editor={editor} />
            {!isTouchDevice && <BubbleMenu editor={editor} />}
            {/* <FloatingMenu editor={editor} /> */}
          </>
        )}
      </EditorContent>
    </TooltipProvider>
  );
}
