import { ReactNode } from 'react';
import { ToolbarLink } from './toolbar-tools/toolbar-link';
import { ToolbarTextBlocks } from './toolbar-tools/toolbar-text-blocks';
import { ToolbarSeparator } from './toolbar-tools/toolbar-separator';
import { ToolbarLists } from './toolbar-tools/toolbar-lists';
import { ToolbarColorSelector } from './toolbar-tools/toolbar-color-selector';
import { ToolbarImage } from './toolbar-tools/toolbar-image';
import { ToolbarUndo } from './toolbar-tools/toolbar-undo';
import { ToolbarRedo } from './toolbar-tools/toolbar-redo';
import { ToolbarBlockquote } from './toolbar-tools/toolbar-blockquote';
import { ToolbarCodeblock } from './toolbar-tools/toolbar-codeblock';
import { ToolbarBold } from './toolbar-tools/toolbar-bold';
import { ToolbarItalic } from './toolbar-tools/toolbar-italic';
import { ToolbarUnderline } from './toolbar-tools/toolbar-underline';
import { ToolbarStrike } from './toolbar-tools/toolbar-strike';
import { ToolbarCode } from './toolbar-tools/toolbar-code';
import { ToolbarAlignLeft } from './toolbar-tools/toolbar-align-left';
import { ToolbarAlignCenter } from './toolbar-tools/toolbar-align-center';
import { ToolbarAlignRight } from './toolbar-tools/toolbar-align-right';
import { ToolbarAlignJustify } from './toolbar-tools/toolbar-align-justify';
import { ToolbarHorizontalRule } from './toolbar-tools/toolbar-horizontal-rule';
import { ToolbarSuperscript } from './toolbar-tools/toolbar-superscript';
import { ToolbarSubscript } from './toolbar-tools/toolbar-subscript';

export function ToolBar({ children }: { children?: ReactNode }) {
  return (
    <div
      className={
        'bg-background flex min-w-0 items-center gap-1 overflow-x-auto border-b p-2'
      }
    >
      {children || (
        <>
          <ToolbarUndo />
          <ToolbarRedo />

          <ToolbarSeparator />

          <ToolbarTextBlocks />
          <ToolbarLists />

          <ToolbarBlockquote />
          <ToolbarCodeblock />

          <ToolbarSeparator />

          <ToolbarBold />
          <ToolbarItalic />
          <ToolbarUnderline />
          <ToolbarStrike />
          <ToolbarCode />

          <ToolbarSeparator />

          <ToolbarColorSelector />

          <ToolbarSeparator />

          <ToolbarLink />

          <ToolbarSeparator />

          <ToolbarAlignLeft />
          <ToolbarAlignCenter />
          <ToolbarAlignRight />
          <ToolbarAlignJustify />
          <ToolbarHorizontalRule />

          <ToolbarSeparator />

          <ToolbarSuperscript />
          <ToolbarSubscript />

          <ToolbarSeparator />

          <ToolbarImage />
        </>
      )}
    </div>
  );
}
