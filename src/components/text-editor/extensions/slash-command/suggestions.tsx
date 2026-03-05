/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactRenderer } from '@tiptap/react';
import tippy, { Instance } from 'tippy.js';
import { SuggestionOptions } from '@tiptap/suggestion';
import {
  BoldIcon,
  ItalicIcon,
  UnderlineIcon,
  StrikethroughIcon,
  TextAlignStartIcon,
  TextAlignCenterIcon,
  TextAlignEndIcon,
  TextAlignJustifyIcon,
  Heading5Icon,
  PilcrowIcon,
  Heading1Icon,
  Heading2Icon,
  Heading3Icon,
  Heading4Icon,
  ListIcon,
  ListOrderedIcon,
  CheckSquareIcon,
  CodeIcon,
  SquareCodeIcon,
  QuoteIcon,
} from 'lucide-react';
import { CommandList, CommandListProps } from './command-list';
import { SuggestionItem } from '../../types/slash-command';

export const suggestion: Omit<SuggestionOptions<SuggestionItem>, 'editor'> = {
  items: ({ query }) => {
    const items: SuggestionItem[] = [
      {
        title: 'Paragraph',
        description: 'Plain text.',
        icon: PilcrowIcon,
        search_term: ['paragraph', 'text', 'p', 'body', 'normal'],
        command: ({ editor, range }) => {
          editor.chain().focus().deleteRange(range).setNode('paragraph').run();
        },
      },
      {
        title: 'Heading 1',
        description: 'Large heading.',
        icon: Heading1Icon,
        search_term: ['heading', 'h1', 'title', 'big', 'header'],
        command: ({ editor, range }) => {
          editor
            .chain()
            .focus()
            .deleteRange(range)
            .setNode('heading', { level: 2 })
            .run();
        },
      },
      {
        title: 'Heading 2',
        description: 'Medium heading.',
        icon: Heading2Icon,
        search_term: ['heading', 'h2', 'subtitle', 'section'],
        command: ({ editor, range }) => {
          editor
            .chain()
            .focus()
            .deleteRange(range)
            .setNode('heading', { level: 3 })
            .run();
        },
      },
      {
        title: 'Heading 3',
        description: 'Small heading.',
        icon: Heading3Icon,
        search_term: ['heading', 'h3', 'subsection'],
        command: ({ editor, range }) => {
          editor
            .chain()
            .focus()
            .deleteRange(range)
            .setNode('heading', { level: 4 })
            .run();
        },
      },
      {
        title: 'Heading 4',
        description: 'Tiny heading.',
        icon: Heading4Icon,
        search_term: ['heading', 'h4', 'small'],
        command: ({ editor, range }) => {
          editor
            .chain()
            .focus()
            .deleteRange(range)
            .setNode('heading', { level: 5 })
            .run();
        },
      },
      {
        title: 'Heading 5',
        description: 'Smallest heading.',
        icon: Heading5Icon,
        search_term: ['heading', 'h5', 'smallest'],
        command: ({ editor, range }) => {
          editor
            .chain()
            .focus()
            .deleteRange(range)
            .setNode('heading', { level: 6 })
            .run();
        },
      },
      {
        title: 'Bullet List',
        description: 'Bulleted list.',
        icon: ListIcon,
        search_term: ['bullet', 'ul', 'unordered', 'list', 'points'],
        command: ({ editor, range }) => {
          editor.chain().focus().deleteRange(range).toggleBulletList().run();
        },
      },
      {
        title: 'Numbered List',
        description: 'Numbered list.',
        icon: ListOrderedIcon,
        search_term: ['number', 'ordered', 'ol', 'list', 'steps'],
        command: ({ editor, range }) => {
          editor.chain().focus().deleteRange(range).toggleOrderedList().run();
        },
      },
      {
        title: 'Task List',
        description: 'Checklist.',
        icon: CheckSquareIcon,
        search_term: ['task', 'todo', 'check', 'checkbox', 'checklist', 'list'],
        command: ({ editor, range }) => {
          editor.chain().focus().deleteRange(range).toggleTaskList().run();
        },
      },
      {
        title: 'Inline Code',
        description: 'Code snippet.',
        icon: CodeIcon,
        search_term: ['code', 'inline', 'snippet', 'cmd'],
        command: ({ editor, range }) => {
          editor.chain().focus().deleteRange(range).setMark('code').run();
        },
      },
      {
        title: 'Code Block',
        description: 'Code section.',
        icon: SquareCodeIcon,
        search_term: ['codeblock', 'code', 'block', 'snippet', 'program'],
        command: ({ editor, range }) => {
          editor.chain().focus().deleteRange(range).toggleCodeBlock().run();
        },
      },
      {
        title: 'Blockquote',
        description: 'Quote block.',
        icon: QuoteIcon,
        search_term: ['quote', 'blockquote', 'citation', 'say'],
        command: ({ editor, range }) => {
          editor.chain().focus().deleteRange(range).toggleBlockquote().run();
        },
      },
      {
        title: 'Bold',
        description: 'Bold text.',
        icon: BoldIcon,
        search_term: ['bold', 'b', 'strong'],
        command: ({ editor, range }) => {
          editor.chain().focus().deleteRange(range).toggleBold().run();
        },
      },
      {
        title: 'Italic',
        description: 'Italic text.',
        icon: ItalicIcon,
        search_term: ['italic', 'i', 'emphasis'],
        command: ({ editor, range }) => {
          editor.chain().focus().deleteRange(range).toggleItalic().run();
        },
      },
      {
        title: 'Underline',
        description: 'Underline text.',
        icon: UnderlineIcon,
        search_term: ['underline', 'u', 'line'],
        command: ({ editor, range }) => {
          editor.chain().focus().deleteRange(range).toggleUnderline().run();
        },
      },
      {
        title: 'Strike',
        description: 'Strikethrough.',
        icon: StrikethroughIcon,
        search_term: ['strike', 'strikethrough', 'delete', 'remove'],
        command: ({ editor, range }) => {
          editor.chain().focus().deleteRange(range).toggleStrike().run();
        },
      },
      {
        title: 'Align start',
        description: 'Align left.',
        icon: TextAlignStartIcon,
        search_term: ['align', 'left', 'start'],
        command: ({ editor, range }) => {
          editor
            .chain()
            .focus()
            .deleteRange(range)
            .toggleTextAlign('left')
            .run();
        },
      },
      {
        title: 'Align center',
        description: 'Align center.',
        icon: TextAlignCenterIcon,
        search_term: ['align', 'center', 'middle'],
        command: ({ editor, range }) => {
          editor
            .chain()
            .focus()
            .deleteRange(range)
            .toggleTextAlign('center')
            .run();
        },
      },
      {
        title: 'Align end',
        description: 'Align right.',
        icon: TextAlignEndIcon,
        search_term: ['align', 'right', 'end'],
        command: ({ editor, range }) => {
          editor
            .chain()
            .focus()
            .deleteRange(range)
            .toggleTextAlign('right')
            .run();
        },
      },
      {
        title: 'Align justify',
        description: 'Justify text.',
        icon: TextAlignJustifyIcon,
        search_term: ['align', 'justify', 'spread'],
        command: ({ editor, range }) => {
          editor
            .chain()
            .focus()
            .deleteRange(range)
            .toggleTextAlign('justify')
            .run();
        },
      },
    ];

    return items.filter((item) =>
      item.search_term.some((term) =>
        term.toLowerCase().includes(query.toLowerCase()),
      ),
    );
  },

  render: () => {
    let component: ReactRenderer<any, CommandListProps>;
    let popup: Instance[];

    return {
      onStart: (props) => {
        component = new ReactRenderer(CommandList, {
          props,
          editor: props.editor,
        });

        popup = tippy('body', {
          getReferenceClientRect: props.clientRect as any,
          appendTo: () => document.body,
          content: component.element,
          showOnCreate: true,
          interactive: true,
          trigger: 'manual',
          placement: 'bottom-start',
        });
      },

      onUpdate(props) {
        component.updateProps(props);

        if (popup[0]) {
          popup[0].setProps({
            getReferenceClientRect: props.clientRect as any,
          });
        }
      },

      onKeyDown(props) {
        if (props.event.key === 'Escape') {
          popup[0].hide();
          return true;
        }
        return component.ref?.onKeyDown(props) ?? false;
      },

      onExit() {
        popup[0].destroy();
        component.destroy();
      },
    };
  },
};
