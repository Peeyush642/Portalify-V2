import React from "react";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/theme-chaos";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/ext-language_tools.js";

const ace = require("ace-builds/src-noconflict/ace");
ace.config.set(
  "basePath",
  "https://cdn.jsdelivr.net/npm/ace-builds@1.4.3/src-noconflict/"
);
ace.config.setModuleUrl(
  "ace/mode/javascript_worker",
  "https://cdn.jsdelivr.net/npm/ace-builds@1.4.3/src-noconflict/worker-javascript.js"
);

export default function Editor(data) {
  return (
    AceEditor && (
      <AceEditor
        style={{ border: "2px solid #dcdcdc", borderRadius: "5px" }}
        mode={""}
        width="100%"
        height="200px"
        theme={""}
        onChange={data.onChange}
        onLoad={function (editor) {
          editor.renderer.setPadding(10);
          editor.renderer.setScrollMargin(10);
        }}
        fontSize={14}
        showPrintMargin={true}
        showGutter={true}
        highlightActiveLine={true}
        value={data.value}
        wrapEnabled={true}
        setOptions={{
          useWorker: false,
          enableBasicAutocompletion: true,
          enableLiveAutocompletion: true,
          enableSnippets: true,
          showLineNumbers: true,
          tabSize: 2,
        }}
      />
    )
  );
}
