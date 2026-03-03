/* eslint-disable @typescript-eslint/no-explicit-any */
import { Extension } from '@tiptap/core';
import Suggestion from '@tiptap/suggestion';
import { suggestion } from './suggestions';

export const SlashCommand = Extension.create({
  name: 'slashCommand',

  addOptions() {
    return {
      suggestion: {
        char: '/',
        command: ({ editor, range, props }: any) => {
          props.command({ editor, range });
        },
      },
    };
  },

  addProseMirrorPlugins() {
    return [
      Suggestion({
        editor: this.editor,
        ...this.options.suggestion,
        ...suggestion,
      }),
    ];
  },
});
