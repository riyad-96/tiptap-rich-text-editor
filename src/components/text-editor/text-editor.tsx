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
import { TooltipProvider } from '../ui/tooltip';
import { SlashCommand } from './slash-command';

export type SetState<T> = (value: T | ((prev: T) => T)) => void;

export type TextEditorProps = {
  hideBubbleMenuOnTouch?: boolean;
  onChange?: (value: Editor) => void;
};

export function TextEditor({
  hideBubbleMenuOnTouch = true,
  onChange,
}: TextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        blockquote: {
          HTMLAttributes: {
            class: '',
          },
        },
        code: {
          HTMLAttributes: {
            class: 'op',
          },
        },
      }),
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
          'tiptap-text-editor prose prose-neutral dark:prose-invert max-sm:prose-sm focus:outline-none bg-background min-h-75 max-w-none w-full px-8 py-6 prose-h2:text-4xl prose-h3:text-3xl prose-h4:text-2xl prose-h5:text-lg prose-h2:font-bold prose-h3:font-semibold prose-h5:font-semibold prose-h6:font-semibold prose-h2:my-6 prose-h3:my-5 prose-h4:my-4 prose-h5:my-3 prose-h6:my-1.5',
      },
    },
    onUpdate: (v) => {
      if (typeof onChange == 'function') {
        onChange(v.editor);
      }
      // print to console
      console.log(v.editor.getHTML());
      console.log(v.editor.getJSON());
    },
    content:
      '<h2>This is a super cool heading</h2><h3>This is a super cool heading</h3><h4>This is a super cool heading</h4><h5>This is a super cool heading</h5><h6>This is a super cool heading</h6><p>This is default paragraph</p><ul><li><p>Bullet list 1</p></li><li><p>Bullet list 2</p></li><li><p>Bullet list 3</p></li></ul><ol><li><p>Numbered list 1</p></li><li><p>Numbered list 2</p></li><li><p>Numbered list 3</p></li></ol><ul data-type="taskList"><li data-checked="false" data-type="taskItem"><label><input type="checkbox"><span></span></label><div><p>Task list 1</p></div></li><li data-checked="false" data-type="taskItem"><label><input type="checkbox"><span></span></label><div><p>Task list 2</p></div></li><li data-checked="false" data-type="taskItem"><label><input type="checkbox"><span></span></label><div><p>Task list 3</p></div></li></ul><p></p>',
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
        className="text-primary overflow-hidden rounded-md border"
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
