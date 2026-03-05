import type { JSONContent } from '@tiptap/core';
import { generateHTML } from '@tiptap/html';

import { tiptapExtensions } from './extensions';
import { tiptapStyleClasses } from './style';

export function Viewer({
  content,
}: {
  content: JSONContent | null | undefined;
}) {
  if (!content) return <></>;

  const html = generateHTML(content, tiptapExtensions());

  return (
    <div className="h-full overflow-x-auto">
      <div
        className={`${tiptapStyleClasses} tiptap-preview whitespace-pre-wrap`}
        dangerouslySetInnerHTML={{ __html: html }}
      ></div>
    </div>
  );
}
