import { ThemeToggler } from '../theme-toggle/theme-toggler';

export function Header() {
  return (
    <header className="flex h-12.5 min-w-0 items-center justify-between border-b px-4">
      <div className="flex items-end gap-2">
        <h1 className="text-xl font-semibold">Rich text editor</h1>
        <span className="text-xs opacity-80">Powered by tiptap</span>
      </div>
      <ThemeToggler />
    </header>
  );
}
