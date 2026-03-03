'use client';

import { useEditor, EditorContent, type Content, Editor } from '@tiptap/react';
import { ToolBar } from './components/toolbar';
import { useEffect, useState } from 'react';
import { BubbleMenu } from './components/bubble-menu';

// extensions
import StarterKit from '@tiptap/starter-kit';
import Highlight from '@tiptap/extension-highlight';
import { TextStyle, Color } from '@tiptap/extension-text-style';
import { TaskList, TaskItem } from '@tiptap/extension-list';
import { TextAlign } from '@tiptap/extension-text-align';
import { Superscript } from '@tiptap/extension-superscript';
import { Subscript } from '@tiptap/extension-subscript';
import { type Transaction } from '@tiptap/pm/state';
import { TooltipProvider } from '../ui/tooltip';

export type SetState<T> = (value: T | ((prev: T) => T)) => void;

export type TextEditorProps = {
  hideOnTouch?: boolean;
  content?: Content;
  onChange?: SetState<{
    editor: Editor;
    transaction: Transaction;
    appendedTransactions: Transaction[];
  }>;
};

export function TextEditor({ hideOnTouch = true, onChange }: TextEditorProps) {
  const [content, setContent] = useState(
    '<h2>This is a super cool heading</h2><h3>This is a super cool heading</h3><h4>This is a super cool heading</h4><p>This is a paragraph</p><ul><li><p>Unordered list 1</p></li><li><p>Unordered list 2</p></li><li><p>Unordered list 3</p></li></ul><ol><li><p>Ordered list 1</p></li><li><p>Ordered list 2</p></li><li><p>Ordered list 3</p></li></ol><ul data-type="taskList"><li data-checked="false" data-type="taskItem"><label><input type="checkbox"><span></span></label><div><p>Task list 1</p></div></li><li data-checked="false" data-type="taskItem"><label><input type="checkbox"><span></span></label><div><p>Task list 2</p></div></li><li data-checked="false" data-type="taskItem"><label><input type="checkbox"><span></span></label><div><p>Task list 3</p></div></li></ul><p></p>',
  );

  const editor = useEditor({
    extensions: [
      StarterKit.configure({}),
      Highlight.configure({ multicolor: true }),
      TaskList,
      TaskItem,
      TextStyle,
      Color,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Superscript,
      Subscript,
    ],
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class:
          'tiptap-text-editor prose max-sm:prose-sm focus:outline-none bg-background min-h-75 max-w-none w-full px-8 py-6',
      },
    },
    content,
    onUpdate: (v) => {
      setContent(v.editor.getHTML());
      if (typeof onChange == 'function') {
        onChange(v);
      }
    },
  });

  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    if (hideOnTouch) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsTouchDevice(window.matchMedia('(pointer: coarse)').matches);
    }
  }, [hideOnTouch]);

  return (
    <TooltipProvider>
      <EditorContent
        editor={editor}
        className="border rounded-md overflow-hidden"
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
