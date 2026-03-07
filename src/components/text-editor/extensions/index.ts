import { TaskItem, TaskList } from '@tiptap/extension-list';
import Subscript from '@tiptap/extension-subscript';
import Superscript from '@tiptap/extension-superscript';
import TextAlign from '@tiptap/extension-text-align';
import { Color, TextStyle } from '@tiptap/extension-text-style';
import StarterKit from '@tiptap/starter-kit';
import Highlight from '@tiptap/extension-highlight';
import Placeholder from '@tiptap/extension-placeholder';
import Image from '@tiptap/extension-image';

import { SlashCommand } from './slash-command';

type TiptapExtensionProps = {
  placeholder?: string | boolean;
};

export const tiptapExtensions = (props?: TiptapExtensionProps) => {
  let placeholder = '';
  if (props) {
    placeholder = props.placeholder
      ? typeof props.placeholder === 'string'
        ? props.placeholder
        : 'Write something...'
      : '';
  }

  return [
    StarterKit,
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
    Placeholder.configure({
      placeholder,
    }),
    Image.configure({
      allowBase64: true,
      resize: {
        enabled: true,
        minWidth: 50,
        minHeight: 50,
        alwaysPreserveAspectRatio: true,
      },
      HTMLAttributes: {
        class: 'rounded-lg',
      },
    }),
  ];
};
