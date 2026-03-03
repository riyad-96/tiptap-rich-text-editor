'use client';

import { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { MoonIcon, SunIcon } from 'lucide-react';

export function ThemeToggler() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  return (
    <Button
      variant="secondary"
      size="sm"
      className="fixed top-4 right-4"
      onClick={() => {
        setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
      }}
    >
      {theme === 'light' ? <MoonIcon /> : <SunIcon />}
    </Button>
  );
}
