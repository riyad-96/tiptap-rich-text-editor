import { createContext } from 'react';

import { EditorContext } from '../types/editor-context';

export const editorContext = createContext<EditorContext | null>(null);
