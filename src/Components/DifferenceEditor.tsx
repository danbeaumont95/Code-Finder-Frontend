// eslint-disable-next-line import/no-extraneous-dependencies
import { DiffEditor } from '@monaco-editor/react';
import React from 'react';

function DifferenceEditor() {
  return (
    <DiffEditor
      height="100vh"
      original={'This line is removed on the right.\njust some text\nabcd\nefgh\nSome more text'}
      modified={'just some text\nabcz\nzzzzefgh\nSome more text.\nThis line is removed on the left.'}
    />
  );
}

export default DifferenceEditor;
