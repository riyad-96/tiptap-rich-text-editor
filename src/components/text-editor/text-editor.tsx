'use client';

import React, { useState, ReactNode, ComponentPropsWithoutRef } from 'react';
import {
  useEditor,
  EditorContent as TiptapEditorContent,
  Editor,
  Extensions,
} from '@tiptap/react';

import { BubbleMenu, ToolBar, ImageBubbleMenu } from './components';
import { tiptapExtensions } from './extensions';
import { TooltipProvider } from '../ui/tooltip';
import { tiptapStyleClasses } from './style';
import { editorContext } from './context/editor-context';
import { useEditorProvider } from './hooks/use-editor-provider';
import { TextEditorProps } from './types/text-editor';

export interface EditorRootProps extends TextEditorProps {
  children: ReactNode;
  extensions?: Extensions;
}

export function EditorRoot({
  children,
  content,
  onChange,
  onMount,
  placeholder,
  extensions,
  hideBubbleMenuOnTouch = true,
  hideTooltip = false,
}: EditorRootProps) {
  const editor = useEditor({
    extensions: extensions || tiptapExtensions({ placeholder }),
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: tiptapStyleClasses,
      },
    },
    onMount: (props) => {
      if (typeof onMount === 'function') onMount(props.editor);
    },
    onUpdate: (props) => {
      if (typeof onChange == 'function') onChange(props.editor);
    },
    content,
  });

  const [isBubbleMenuHidden, setIsBubbleMenuHidden] = useState(false);

  React.useEffect(() => {
    if (hideBubbleMenuOnTouch) {
      setIsBubbleMenuHidden(window.matchMedia('(pointer: coarse)').matches);
    }
  }, [hideBubbleMenuOnTouch]);

  if (!editor) return null;

  return (
    <editorContext.Provider
      value={{
        editor,
        isBubbleMenuHidden,
        hideTooltip,
      }}
    >
      {children}
    </editorContext.Provider>
  );
}

export interface EditorContentProps extends Omit<
  ComponentPropsWithoutRef<typeof TiptapEditorContent>,
  'editor'
> {
  className?: string;
  children?: ReactNode;
  editor?: Editor | null;
}

export function EditorContent({
  className,
  children,
  editor: propsEditor,
  ...props
}: EditorContentProps) {
  const { editor: contextEditor } = useEditorProvider();
  const editor = propsEditor || contextEditor;

  return (
    <TiptapEditorContent
      editor={editor}
      className={
        className ||
        'text-primary grid h-full grid-rows-[auto_1fr] overflow-y-auto'
      }
      spellCheck={false}
      {...props}
    >
      {children}
    </TiptapEditorContent>
  );
}

export function TextEditor(props: TextEditorProps) {
  return (
    <EditorRoot {...props}>
      <TooltipProvider>
        <EditorContent>
          <ToolBar />
        </EditorContent>
        <BubbleMenu />
        <ImageBubbleMenu />
      </TooltipProvider>
    </EditorRoot>
  );
}
