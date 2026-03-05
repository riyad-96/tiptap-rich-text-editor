import { TaskItem, TaskList } from '@tiptap/extension-list';
import Subscript from '@tiptap/extension-subscript';
import Superscript from '@tiptap/extension-superscript';
import TextAlign from '@tiptap/extension-text-align';
import { Color, TextStyle } from '@tiptap/extension-text-style';
import StarterKit from '@tiptap/starter-kit';
import { SlashCommand } from './slash-command';
import Highlight from '@tiptap/extension-highlight';

export const tiptapExtensions = [
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
];
