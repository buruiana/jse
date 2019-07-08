import React from "react";
import Form from "react-jsonschema-form";
import isEmpty from "lodash/isEmpty";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMinusCircle,
  faArrowCircleRight
} from "@fortawesome/free-solid-svg-icons";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";

const Preview = props => {
  const { schemaCode, uiSchemaCode } = props;
  const onChange = () => { return null };
  const onSubmit = () => { return null };
  const code = new Function(schemaCode)() || {};
  const onValueChange = () => { return null };

  return (
    <>
      <Form
        schema={code}
        //uiSchema={uiSchemaCode}
        onChange={onChange}
        onSubmit={onSubmit}
        showErrorList={true}
      >
        <button type="submit" className="hidden">Submit</button>
      </Form>
      <div className="container_editor_area">
        <Editor
          value={JSON.stringify(schemaCode, null, 2)}
          onValueChange={onValueChange}
          highlight={code =>
            highlight(code, languages.js)
              .split("\n")
              .map(
                line =>
                  `<span class="container_editor_line_number">${line}</span>`
              )
              .join("\n")
          }
          padding={10}
          className="container__editor"
        />
      </div>
      <div className="container_editor_area">
        <Editor
          value={JSON.stringify(uiSchemaCode, null, 2)}
          onValueChange={onValueChange}
          highlight={code =>
            highlight(code, languages.js)
              .split("\n")
              .map(
                line =>
                  `<span class="container_editor_line_number">${line}</span>`
              )
              .join("\n")
          }
          padding={10}
          className="container__editor"
        />
      </div>
    </>
  );
};

export default Preview;


