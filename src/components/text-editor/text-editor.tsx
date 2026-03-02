'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import { ToolBar } from './components/toolbar';
import { useState } from 'react';
import { BubbleMenu } from './components/bubble-menu';

// extensions
import StarterKit from '@tiptap/starter-kit';
import Highlight from '@tiptap/extension-highlight';
import { TaskList, TaskItem } from '@tiptap/extension-list';

export function TextEditor() {
  const [content, setContent] = useState('<h2>This is a super cool heading</h2><p>This is a paragraph</p><ul><li><p>Unordered list 1</p></li><li><p>Unordered list 2</p></li><li><p>Unordered list 3</p></li></ul><ol><li><p>Ordered list 1</p></li><li><p>Ordered list 2</p></li><li><p>Ordered list 3</p></li></ol><ul data-type="taskList"><li data-checked="false" data-type="taskItem"><label><input type="checkbox"><span></span></label><div><p>Task list 1</p></div></li><li data-checked="false" data-type="taskItem"><label><input type="checkbox"><span></span></label><div><p>Task list 2</p></div></li><li data-checked="false" data-type="taskItem"><label><input type="checkbox"><span></span></label><div><p>Task list 3</p></div></li></ul><p></p>');

  const editor = useEditor({
    extensions: [
      StarterKit.configure({}),
      Highlight.configure({ multicolor: true }),
      TaskList,
      TaskItem
    ],
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class:
          'tiptap-text-editor prose dark:prose-invert max-sm:prose-sm focus:outline-none bg-background relative h-full max-w-none w-full p-4',
      },
    },
    content,
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML());
      console.log(editor.getHTML());
    },
  });

  // const viewEditor = useEditor({
  //   extensions: [
  //     StarterKit.configure({}),
  //     Highlight.configure({ multicolor: true }),
  //   ],
  //   editable: false,
  //   immediatelyRender: false,
  //   editorProps: {
  //     attributes: {
  //       class:
  //         'prose dark:prose-invert max-sm:prose-sm focus:outline-none bg-background relative h-full max-w-none w-full p-4',
  //     },
  //   },
  //   content,
  // });

  return (
    <div className="border rounded-md overflow-hidden">
      {editor && (
        <>
          <ToolBar editor={editor} />
          <BubbleMenu editor={editor} />
          {/* <FloatingMenu editor={editor} /> */}
        </>
      )}

      <EditorContent editor={editor} className="min-h-75" />
      {/* <EditorContent
        editor={viewEditor}
        className="h-75 border rounded-lg overflow-hidden"
      /> */}
    </div>
  );
}
