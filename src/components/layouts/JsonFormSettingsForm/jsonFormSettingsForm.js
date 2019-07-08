import React from "react";

import SortableTree, {
  removeNodeAtPath,
  getFlatDataFromTree
} from "react-sortable-tree";
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

import { defaultTree } from "../../../utils/constants";

const externalNodeType = "yourNodeType";
const shouldCopyOnOutsideDrop = true;
const getNodeKey = ({ treeIndex }) => treeIndex;

const JsonFormSettingsForm = props => {
  const { tree, schemaCode, setTree, setCurrentNode } = props;

  const remove = path => {
    const newTree = removeNodeAtPath({
      treeData: tree,
      path,
      getNodeKey
    });
    setTree(newTree);
  };

  const validateJsonForm = jsonForm => {
    const flatData = getFlatDataFromTree({
      treeData: jsonForm,
      getNodeKey: ({ treeIndex }) => treeIndex,
      ignoreCollapsed: false
    });
    console.log("console: flatData", flatData);
    return flatData.find(el => {
      const isPrimitive =
        el.node.subtitle === "String" ||
        el.node.subtitle === "Integer" ||
        el.node.subtitle === "Boolean" ||
        el.node.subtitle === "Number";

      return (isPrimitive && !isEmpty(el.node.children)) || jsonForm.length > 1;
    });
  };

  const onChange = treeData => {
    if (isEmpty(validateJsonForm(treeData))) {
      setTree(treeData);
    }
  };

  const setCurrentForm = (node, path) => {
    setCurrentNode({ node, path });
  };

  const onChangeSchemaEditor = data => {
    setTree(data);
  };

  const log = type => console.log.bind(console, type);
  const onValueChange = () => {
    console.log("console: -----------");
  };

  return (
    <>
      <div className="flex">
        <div
          style={{
            height: 400,
            width: "30%",
            float: "left"
          }}
        >
          <SortableTree
            treeData={defaultTree}
            onChange={() => console.log("changed")}
            dndType={externalNodeType}
            shouldCopyOnOutsideDrop={shouldCopyOnOutsideDrop}
          />
        </div>

        <div
          style={{
            height: 400,
            width: "40%",
            float: "left"
          }}
        >
          <SortableTree
            treeData={tree}
            onChange={onChange}
            dndType={externalNodeType}
            shouldCopyOnOutsideDrop={shouldCopyOnOutsideDrop}
            getNodeKey={getNodeKey}
            generateNodeProps={({ node, path }) => ({
              buttons: [
                <FontAwesomeIcon
                  icon={faMinusCircle}
                  onClick={() => remove(path)}
                />,
                <FontAwesomeIcon
                  icon={faArrowCircleRight}
                  onClick={() => setCurrentForm(node, path)}
                />
              ]
            })}
          />
        </div>
      </div>
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
    </>
  );
};

export default JsonFormSettingsForm;
