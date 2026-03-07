import { Editor } from '@tiptap/react';

interface UploadResponse {
  url: string;
  alt?: string;
}

/**
 * Mock function for server-side upload.
 * Replace this with your actual API call.
 */
const uploadImageToServer = async (file: File): Promise<UploadResponse> => {
  // Example: const formData = new FormData(); formData.append('file', file);
  // const res = await fetch('/api/upload', { method: 'POST', body: formData });
  // return res.json();

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        url: URL.createObjectURL(file), // Using object URL for local preview
        alt: file.name,
      });
    }, 1000);
  });
};

export const addImage = (editor: Editor | null) => {
  if (!editor) return;

  const input = document.createElement('input');
  input.type = 'file';
  input.accept = 'image/*';

  input.onchange = async () => {
    if (input.files?.length) {
      const file = input.files[0];

      // Optional: Add a 'loading' placeholder or toast here
      try {
        const { url, alt } = await uploadImageToServer(file);

        editor
          .chain()
          .focus()
          .setImage({ src: url, alt: alt ?? 'uploaded image' })
          .run();
      } catch (error) {
        console.error('Image upload failed:', error);
      }
    }
  };

  input.click();
};
