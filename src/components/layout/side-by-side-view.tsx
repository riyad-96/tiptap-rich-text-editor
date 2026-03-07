'use client';

import { useEffect, useRef, useState } from 'react';
import { TextEditor } from '../text-editor/text-editor';
import { Viewer } from '../text-editor/viewer';
import { useDebounce } from 'kitzo';
import type { JSONContent } from '@tiptap/core';

export function SideBySideView() {
  const [content, setContent] = useState<JSONContent | null>(null);
  const debouncedContent = useDebounce(content, 200);

  // handle resize
  const leftPanelRef = useRef<HTMLDivElement | null>(null);
  const resizeBarRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!leftPanelRef.current || !resizeBarRef.current) return;

    const leftPanel = leftPanelRef.current;
    const resizeBar = resizeBarRef.current;

    let offset = 0;

    // resize
    const resize = (e: MouseEvent) => {
      leftPanel.style.width = e.clientX - offset + 'px';
    };

    // stop resize
    const stopResize = () => {
      document.body.style.userSelect = 'auto';
      document.body.style.cursor = 'auto';

      window.removeEventListener('mousemove', resize);
      window.removeEventListener('mouseup', stopResize);
    };

    // start resize
    const startResize = (e: MouseEvent) => {
      offset = e.clientX - resizeBar.offsetLeft;
      document.body.style.userSelect = 'none';
      document.body.style.cursor = 'col-resize';

      window.addEventListener('mousemove', resize);
      window.addEventListener('mouseup', stopResize);
    };

    resizeBar.addEventListener('mousedown', startResize);

    return () => {
      if (resizeBar) {
        resizeBar.removeEventListener('mousedown', startResize);
      }
    };
  }, []);

  return (
    <div className="flex min-h-0 min-w-0">
      <div ref={leftPanelRef} className="w-1/2">
        <TextEditor
          content='<h5>Todo:</h5><ul data-type="taskList"><li data-checked="true" data-type="taskItem"><label><input type="checkbox" checked="checked"><span></span></label><div><p>Side by side view: editor | preview</p></div></li><li data-checked="true" data-type="taskItem"><label><input type="checkbox" checked="checked"><span></span></label><div><p>Test json as editor content</p></div></li><li data-checked="true" data-type="taskItem"><label><input type="checkbox" checked="checked"><span></span></label><div><p>Slash command</p></div></li><li data-checked="false" data-type="taskItem"><label><input type="checkbox"><span></span></label><div><p>Image upload</p></div></li></ul><p></p>'
          onChange={(editor) => {
            setContent(editor.getJSON());
          }}
          placeholder="Write, type '/' for commands..."
        />
      </div>

      <div
        className="bg-border/40 hover:bg-border relative w-1 shrink-0 cursor-col-resize"
        ref={resizeBarRef}
      />

      <div className="grid min-w-0 flex-1 grid-rows-[auto_1fr] overflow-x-hidden">
        <div className="flex h-12.25 items-center border-b px-4">Preview</div>
        <Viewer content={debouncedContent} />
      </div>
    </div>
  );
}
