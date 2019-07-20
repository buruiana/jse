import React from "react";
import Form from "react-jsonschema-form";
import isEmpty from "lodash/isEmpty";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMinusCircle,
  faArrowCircleRight
} from "@fortawesome/free-solid-svg-icons";
import AceEditor from "react-ace";
import "brace/mode/jsx";
import "brace/theme/xcode";

const Preview = props => {
  const { schemaCode, uiSchemaCode } = props;
  const onChange = () => {
    return null;
  };
  const onSubmit = () => {
    return null;
  };
  //const code = new Function(schemaCode)() || {};
  const onValueChange = () => {
    return null;
  };

  return (
    <>
      <Form
        schema={JSON.parse(schemaCode)}
        //uiSchema={uiSchemaCode}
        onChange={onChange}
        onSubmit={onSubmit}
        showErrorList={true}
      >
        <button type="submit" className="hidden">
          Submit
        </button>
      </Form>
      <div className="container_editor_area">
        <AceEditor
          mode="json"
          theme="xcode"
          onChange={onChange}
          name="UNIQUE_ID_OF_DIV"
          editorProps={{ $blockScrolling: true }}
          setOptions={{
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: true,
            enableSnippets: false,
            showLineNumbers: true,
            tabSize: 2
          }}
          fontSize={12}
          showPrintMargin={true}
          showGutter={true}
          highlightActiveLine={true}
          value={schemaCode}
          height="750px"
        />
      </div>
    </>
  );
};

export default Preview;
