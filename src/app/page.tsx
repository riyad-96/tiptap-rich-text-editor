import { TextEditor } from '@/components/text-editor/text-editor';
import { ThemeToggler } from '@/components/theme-toggle/theme-toggler';

export default function page() {
  return (
    <div className="max-w-250 mx-auto py-20 px-4">
      <ThemeToggler />
      <TextEditor />
    </div>
  );
}
