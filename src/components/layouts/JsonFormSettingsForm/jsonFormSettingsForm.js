import React from 'react';

import SortableTree, {
  removeNodeAtPath,
  getFlatDataFromTree,
} from 'react-sortable-tree';
import isEmpty from 'lodash/isEmpty';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMinusCircle,
  faArrowCircleRight
} from "@fortawesome/free-solid-svg-icons";

const externalNodeType = 'yourNodeType';
const shouldCopyOnOutsideDrop = true;
const getNodeKey = ({ treeIndex }) => treeIndex;
const treeData = [
  {
    title: '',
    subtitle: 'String',
  },
  {
    title: '',
    subtitle: 'Number',
  },
  {
    title: '',
    subtitle: 'Integer', },
  {
    title: '',
    subtitle: 'Boolean', },
  {
    title: '',
    subtitle: 'Object', },
  {
    title: '',
    subtitle: 'Array', },
];

const JsonFormSettingsForm = props => {
  const { tree, currentNode, setTree, setCurrentNode } = props;

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
      ignoreCollapsed: false,
    });
    console.log('console: flatData', flatData);
    return flatData.find(el => {
      const isPrimitive = (el.node.subtitle === 'String' || el.node.subtitle === 'Integer' || el.node.subtitle === 'Boolean' || el.node.subtitle === 'Number');

      return ((isPrimitive && !isEmpty(el.node.children)) || jsonForm.length > 1);
    });
  };

  const onChange = treeData => {
    if (isEmpty(validateJsonForm(treeData))) {
      setTree(treeData);
    }
  };

  const setCurrentForm = (node, path) => {
    setCurrentNode({node, path});
  };

  const onChangeSchemaEditor = data => {
   setTree(data);
  };

  const log = (type) => console.log.bind(console, type);

  return (
    <div className='flex'>
      <div
        style={{
          height: 400,
          width: '40%',
          float: 'left'
        }}
      >
        <SortableTree
          treeData={treeData}
          onChange={() => console.log('changed')}
          dndType={externalNodeType}
          shouldCopyOnOutsideDrop={shouldCopyOnOutsideDrop}
        />
      </div>

      <div
        style={{
          height: 400,
          width: '60%',
          float: 'left',
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
              <FontAwesomeIcon icon={faMinusCircle} onClick={() => remove(path)} />,
              <FontAwesomeIcon icon={faArrowCircleRight} onClick={() => setCurrentForm(node, path)} />
            ]
          })}
        />
      </div>
    </div>
  );
}

export default JsonFormSettingsForm;