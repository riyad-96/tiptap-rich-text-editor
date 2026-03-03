import { TextEditor } from '@/components/text-editor/text-editor';
import { ThemeToggler } from '@/components/theme-toggle/theme-toggler';

export default function page() {
  return (
    <div className="mx-auto max-w-250 px-4 py-20">
      <ThemeToggler />
      <TextEditor />
    </div>
  );
}
