/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactRenderer } from '@tiptap/react';
import tippy, { Instance } from 'tippy.js';
import { SuggestionOptions } from '@tiptap/suggestion';
import {
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Text,
  List,
  ListOrdered,
  CheckSquare,
  Code,
  SquareCode,
  Quote,
} from 'lucide-react';
import { CommandList, CommandListProps } from './command-list';
import { SuggestionItem } from '../types/slash-command';

export const suggestion: Omit<SuggestionOptions<SuggestionItem>, 'editor'> = {
  items: ({ query }) => {
    const items: SuggestionItem[] = [
      {
        title: 'Paragraph',
        description: 'Just start typing with plain text.',
        icon: Text,
        search_term: ['paragraph', 'text', 'p'],
        command: ({ editor, range }) => {
          editor.chain().focus().deleteRange(range).setNode('paragraph').run();
        },
      },
      {
        title: 'Heading 1',
        description: 'Big section heading.',
        icon: Heading1,
        search_term: ['heading 1', 'h1', 'big heading'],
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
        description: 'Medium section heading.',
        icon: Heading2,
        search_term: ['heading 2', 'h2', 'medium heading'],
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
        description: 'Small section heading.',
        icon: Heading3,
        search_term: ['heading 3', 'h3', 'small heading'],
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
        description: 'Ultra small section heading.',
        icon: Heading4,
        search_term: ['heading 4', 'h4', 'tiny heading'],
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
        title: 'Bullet List',
        description: 'Create a simple bulleted list.',
        icon: List,
        search_term: ['bullet', 'unordered list', 'list'],
        command: ({ editor, range }) => {
          editor.chain().focus().deleteRange(range).toggleBulletList().run();
        },
      },
      {
        title: 'Numbered List',
        description: 'Create a list with numbering.',
        icon: ListOrdered,
        search_term: ['numbered', 'ordered list', 'list'],
        command: ({ editor, range }) => {
          editor.chain().focus().deleteRange(range).toggleOrderedList().run();
        },
      },
      {
        title: 'Task List',
        description: 'Track tasks with a checklist.',
        icon: CheckSquare,
        search_term: ['task', 'checklist', 'todo', 'list'],
        command: ({ editor, range }) => {
          editor.chain().focus().deleteRange(range).toggleTaskList().run();
        },
      },
      {
        title: 'Inline Code',
        description: 'Add a small snippet of code.',
        icon: Code,
        search_term: ['inline code', 'code', 'snippet'],
        command: ({ editor, range }) => {
          editor.chain().focus().deleteRange(range).setMark('code').run();
        },
      },
      {
        title: 'Code Block',
        description: 'Add a block of code.',
        icon: SquareCode,
        search_term: [
          'code block',
          'block code',
          'snippet block',
          'block',
          'code',
        ],
        command: ({ editor, range }) => {
          editor.chain().focus().deleteRange(range).toggleCodeBlock().run();
        },
      },
      {
        title: 'Blockquote',
        description: 'Capture a quote.',
        icon: Quote,
        search_term: ['blockquote', 'quote', 'citation'],
        command: ({ editor, range }) => {
          editor.chain().focus().deleteRange(range).toggleBlockquote().run();
        },
      },
    ];

    return items
      .filter((item) =>
        item.search_term.some((term) =>
          term.toLowerCase().includes(query.toLowerCase()),
        ),
      )
      .slice(0, 10);
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
