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
import { SlashCommand } from './slash-command';

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
  // const [content, setContent] = useState<Content>(null);

  const [content, setContent] = useState<Content>(
    '<h2><span style="color: rgb(37, 99, 235);">Todos</span></h2><ul data-type="taskList"><li data-checked="false" data-type="taskItem"><label><input type="checkbox"><span></span></label><div><p>side by side view</p></div></li><li data-checked="true" data-type="taskItem"><label><input type="checkbox" checked="checked"><span></span></label><div><p>test json as tiptap content</p></div></li><li data-checked="true" data-type="taskItem"><label><input type="checkbox" checked="checked"><span></span></label><div><p>slash command</p></div></li><li data-checked="false" data-type="taskItem"><label><input type="checkbox"><span></span></label><div><p>image upload</p></div></li></ul><p></p>',
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
      SlashCommand,
    ],
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class:
          'tiptap-text-editor prose dark:prose-invert max-sm:prose-sm focus:outline-none bg-background min-h-75 max-w-none w-full px-8 py-6',
      },
    },
    content,
    onUpdate: (v) => {
      // setContent(v.editor.getJSON());
      setContent(v.editor.getHTML());

      if (typeof onChange == 'function') {
        onChange(v);
      }

      // print to console
      console.log(v.editor.getHTML());
      console.log(v.editor.getJSON());
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
        className="text-primary overflow-hidden rounded-md border"
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
