import Image from '@tiptap/extension-image';
import { mergeAttributes } from '@tiptap/core';

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    customImage: {
      /**
       * Set the image alignment
       */
        setImageAlign: (align: 'left' | 'center' | 'right' | null) => ReturnType;
      /**
       * Set the image to full width
       */
      setImageFullWidth: () => ReturnType;
      /**
       * Update a data attribute on the image
       */
      updateImageDataAttribute: (
        attributes: Record<string, string | number | boolean>,
      ) => ReturnType;
    };
  }
}

export const CustomImage = Image.extend({
  name: 'image',

  addAttributes() {
    return {
      ...this.parent?.(),
      width: {
        default: '100%',
        parseHTML: (element) => element.getAttribute('width'),
        renderHTML: (attributes) => {
          if (!attributes.width) return {};
          return {
            width: attributes.width,
          };
        },
      },
      height: {
        default: 'auto',
        parseHTML: (element) => element.getAttribute('height'),
        renderHTML: (attributes) => {
          if (!attributes.height) return {};
          return {
            height: attributes.height,
          };
        },
      },
      align: {
        default: null,
        parseHTML: (element) => element.getAttribute('data-align'),
        renderHTML: (attributes) => {
          if (!attributes.align) return {};
          return {
            'data-align': attributes.align,
          };
        },
      },
    };
  },

  addCommands() {
    return {
      ...this.parent?.(),
      setImageAlign:
        (align) =>
        ({ commands }) => {
          return commands.updateAttributes('image', { align });
        },
      setImageFullWidth:
        () =>
        ({ commands }) => {
          return commands.updateAttributes('image', {
            width: '100%',
            height: 'auto',
            align: null,
          });
        },
      updateImageDataAttribute:
        (attributes) =>
        ({ commands }) => {
          return commands.updateAttributes('image', attributes);
        },
    };
  },

  renderHTML({ HTMLAttributes }) {
    return [
      'img',
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
    ];
  },

  addNodeView() {
    return (props) => {
      const { node, editor, getPos } = props;
      const { align, src, alt, width, height } = node.attrs;

      const container = document.createElement('div');
      container.setAttribute('data-resize-container', '');
      if (align) {
        container.setAttribute('data-align', align);
      }

      const wrapper = document.createElement('div');
      wrapper.setAttribute('data-resize-wrapper', '');
      wrapper.style.position = 'relative';
      wrapper.style.display = 'inline-block';

      const img = document.createElement('img');
      img.src = src;
      img.alt = alt || '';

      if (width) {
        img.setAttribute('width', width);
        if (width === '100%') {
          wrapper.style.width = '100%';
        } else {
          wrapper.style.width = 'auto'; // Let the image dictate the width
        }
      }
      if (height) {
        img.setAttribute('height', height);
      }

      img.style.display = 'block';
      img.style.maxWidth = '100%';
      img.style.height = 'auto';

      if (this.options.HTMLAttributes.class) {
        img.classList.add(...this.options.HTMLAttributes.class.split(' '));
      }

      // Create resize handles
      const handleLeft = document.createElement('div');
      handleLeft.setAttribute('data-resize-handle', 'left');

      const handleRight = document.createElement('div');
      handleRight.setAttribute('data-resize-handle', 'right');

      wrapper.appendChild(img);
      wrapper.appendChild(handleLeft);
      wrapper.appendChild(handleRight);
      container.appendChild(wrapper);

      const onMouseDown = (event: MouseEvent, direction: 'left' | 'right') => {
        event.preventDefault();
        event.stopPropagation();

        const startX = event.clientX;
        const startWidth = img.offsetWidth;
        const aspectRatio = img.naturalHeight / img.naturalWidth;

        const onMouseMove = (moveEvent: MouseEvent) => {
          const deltaX = moveEvent.clientX - startX;
          let newWidth =
            direction === 'right' ? startWidth + deltaX : startWidth - deltaX;

          // Constraints from options
          const resizeOptions = this.options.resize;
          const minWidth =
            (typeof resizeOptions === 'object' && resizeOptions?.minWidth) ||
            50;
          const maxWidth = container.offsetWidth;

          if (newWidth < minWidth) newWidth = minWidth;
          if (newWidth > maxWidth) newWidth = maxWidth;

          img.setAttribute('width', Math.round(newWidth).toString());
          img.setAttribute(
            'height',
            Math.round(newWidth * aspectRatio).toString(),
          );
          wrapper.style.width = 'auto';
        };

        const onMouseUp = () => {
          document.removeEventListener('mousemove', onMouseMove);
          document.removeEventListener('mouseup', onMouseUp);

          if (typeof getPos === 'function') {
            editor.commands.updateAttributes('image', {
              width: img.getAttribute('width'),
              height: img.getAttribute('height'),
            });
          }
        };

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
      };

      handleLeft.addEventListener('mousedown', (e) => onMouseDown(e, 'left'));
      handleRight.addEventListener('mousedown', (e) => onMouseDown(e, 'right'));

      return {
        dom: container,
        contentDOM: null,
      };
    };
  },
});
