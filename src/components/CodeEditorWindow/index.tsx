import { useState } from "react";
import Editor from "@monaco-editor/react";

interface CodeEditorWindowProps {
  onChange: Function;
  language: string;
  code: string;
  theme: string;
}

export default function CodeEditorWindow(props: CodeEditorWindowProps) {
  const { onChange, language, code, theme } = props;

  const [value, setValue] = useState(code || "");

  const handleEditorChange = (value: string) => {
    setValue(value);
    onChange("code", value);
  };
  return (
    <div className=" overlay rounded-md overflow-hidden w-full h-full shadow-2xl">
      <Editor
        height="85vh"
        width={"100%"}
        language={language || "javascript"}
        value={value}
        theme={theme}
        defaultValue="// some comment"
        onChange={(value) => {
          if (value) {
          }
          handleEditorChange;
        }}
      />
    </div>
  );
}
