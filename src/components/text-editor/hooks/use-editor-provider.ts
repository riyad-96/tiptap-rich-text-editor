import { useContext } from 'react';

import { editorContext } from '../context/editor-context';

export function useEditorProvider() {
  const context = useContext(editorContext);

  if (!context) {
    throw new Error(
      'useEditorProvider must be used within editorContext.Provider',
    );
  }

  return context;
}
