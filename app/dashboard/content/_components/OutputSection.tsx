import React, { useEffect, useRef } from "react";
import "@toast-ui/editor/dist/toastui-editor.css";
import "@toast-ui/editor/dist/theme/toastui-editor-dark.css";
import { Editor } from "@toast-ui/react-editor";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";

interface PropTypes {
  aiOutput: string;
}

const OutputSection = ({ aiOutput }: PropTypes) => {
  const editorRef: any = useRef();

  useEffect(() => {
    const editorInstance = editorRef.current.getInstance();
    editorInstance.setMarkdown(aiOutput);
  }, [aiOutput]);

  return (
    <div className="bg-dark text-light rounded-lg shadow-lg border">
      <div className="flex justify-between items-center p-5">
        <h2 className="font-medium text-lg">Your Result</h2>
        <Button className="flex flex-row items-center gap-2">
          <Copy className="w-4 h-4" /> Copy
        </Button>
      </div>

      <Editor
        ref={editorRef}
        initialValue="Preview of your result will appear in the markdown tab."
        previewStyle="horizontal"
        height="600px"
        initialEditType="wysiwyg"
        useCommandShortcut={true}
        theme="dark"
        onChange={() =>
          console.log(editorRef.current.getInstance().getMarkdown())
        }
      />
    </div>
  );
};

export default OutputSection;
