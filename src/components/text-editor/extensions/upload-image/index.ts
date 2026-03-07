import { Node, ReactNodeViewRenderer } from '@tiptap/react';
import { ImagePlaceholderBlock } from './image-placeholder-block';

// 1. Define the interface for your custom commands
declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    imagePlaceholder: {
      /**
       * Inserts an image placeholder block
       */
      insertImagePlaceholder: () => ReturnType;
    };
  }
}

export const ImagePlaceholder = Node.create({
  name: 'imagePlaceholder',
  group: 'block',
  atom: false,

  parseHTML() {
    return [{ tag: 'div[data-image-placeholder]' }];
  },

  renderHTML() {
    return ['div', { 'data-image-placeholder': '' }];
  },

  addNodeView() {
    return ReactNodeViewRenderer(ImagePlaceholderBlock);
  },

  addCommands() {
    return {
      insertImagePlaceholder:
        () =>
        ({ commands }) => {
          return commands.insertContent({ type: this.name });
        },
    };
  },
});
