// types/slash-command.ts
import { Editor, Range } from '@tiptap/core';
import { LucideIcon } from 'lucide-react';

export interface SuggestionItem {
  title: string;
  description: string;
  icon: LucideIcon;
  command: (props: { editor: Editor; range: Range }) => void;
  search_term: string[];
}
