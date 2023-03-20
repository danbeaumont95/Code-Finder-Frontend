import React, { useEffect, useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import Editor from '@monaco-editor/react';

function FileUploader({ onFileLoad }: any) {
  return <input type="file" onChange={(e: any) => onFileLoad(e.target.files[0])} />;
}

function FileLoader() {
  const [file, setFile] = useState();
  const [value, setValue] = useState();

  useEffect(() => {
    if (file) {
      const reader = new FileReader();
      reader.onload = async (e: any) => {
        setValue(e.target.result);
      };
      reader.readAsText(file);
    }
  }, [file]);

  return (
    <>
      <FileUploader onFileLoad={setFile} />
      <Editor height="90vh" language="javascript" value={value} />
    </>
  );
}

export default FileLoader;
