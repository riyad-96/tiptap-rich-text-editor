import { TaskItem, TaskList } from '@tiptap/extension-list';
import Subscript from '@tiptap/extension-subscript';
import Superscript from '@tiptap/extension-superscript';
import TextAlign from '@tiptap/extension-text-align';
import { Color, TextStyle } from '@tiptap/extension-text-style';
import StarterKit from '@tiptap/starter-kit';
import Highlight from '@tiptap/extension-highlight';
import Placeholder from '@tiptap/extension-placeholder';
import Image from '@tiptap/extension-image';
import DragHandle from '@tiptap/extension-drag-handle';

import { SlashCommand } from './slash-command';
import { ImagePlaceholder } from './upload-image';

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
        directions: ['left', 'right'],
        minWidth: 50,
        minHeight: 50,
        alwaysPreserveAspectRatio: true,
      },
      HTMLAttributes: {
        class: 'rounded-lg',
      },
    }),
    ImagePlaceholder,
    DragHandle.configure({
      render: () => {
        const element = document.createElement('div');
        element.classList.add('tiptap-global-drag-handler-container');

        // You can inject a Lucide icon or simple dots here
        element.innerHTML = `
      <svg class="tiptap-global-drag-handler" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="9" cy="5" r="1"/><circle cx="9" cy="12" r="1"/><circle cx="9" cy="19" r="1"/><circle cx="15" cy="5" r="1"/><circle cx="15" cy="12" r="1"/><circle cx="15" cy="19" r="1"/>
      </svg>
    `;

        return element;
      },
    }),
  ];
};
