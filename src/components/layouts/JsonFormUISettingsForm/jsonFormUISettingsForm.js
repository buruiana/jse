import React from 'react';
import SortableTree, { changeNodeAtPath } from 'react-sortable-tree';
import isEqual from 'lodash/isEqual';
import get from 'lodash/get';
import Form from "react-jsonschema-form";
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import {
  JSON_FORM_UI_SETTINGS,
} from '../../modals/constants';

const externalNodeType = 'yourNodeType';
const shouldCopyOnOutsideDrop = true;
const getNodeKey = ({ treeIndex }) => treeIndex;

const JsonFormUISettingsForm = props => {
  const { tree } = props;
  const booleanWidgetEnum = ['radio', 'select', 'checkbox', 'hidden'];
  const stringWidgetEnum = ['textarea', 'password', 'color', 'text', 'hidden'];
  const integerWidgetEnum = ['updown', 'range', 'radio', 'hidden'];
  const html5InputTypesEnum = ['text', 'password', 'submit', 'reset', 'radio', 'checkbox', 'button', 'color', 'date', 'datetime-local', 'email', 'month', 'number', 'range', 'search', 'tel', 'time', 'url', 'week', 'hidden'];

  const { node, path } = props.nodePath;
  const getWidgetEnum = () => {
    switch (props.nodePath.node.type) {
      case 'string':
        return stringWidgetEnum;
      case 'boolean':
        return booleanWidgetEnum;
      case 'integer':
      case 'number':
        return integerWidgetEnum;
      default:
        return '';
    }
  };

  const currentUiSchema = node.uiSchema;
  const schema = {
    type: 'object',
    properties: {
      uiWidget: {
        type: 'object',
        title: 'ui:widget',
        properties: {
          widget: {
            type: 'string',
            title: 'ui:widget',
            enum: getWidgetEnum(),
            default: get(currentUiSchema, 'uiWidget.widget', ''),
          },
        },
      },
      uiOptions: {
        type: 'object',
        title: 'ui:options',
        properties: {
          label: {
            type: 'boolean',
            title: 'hasLabel',
            default: get(currentUiSchema, 'uiOptions.label', true),
          },
          classNames: {
            type: 'string',
            title: 'classNames',
            default: get(currentUiSchema, 'uiOptions.classNames', ''),
          },
          inputType: {
            type: 'string',
            title: 'inputType',
            enum: html5InputTypesEnum,
            default: get(currentUiSchema, 'uiOptions.inputType', 'text'),
          },
          backgroundColor: {
            type: 'string',
            title: 'backgroundColor',
            default: get(currentUiSchema, 'uiOptions.backgroundColor', ''),
          },
          rows: {
            type: 'integer',
            title: 'rows',
            default: get(currentUiSchema, 'uiOptions.rows', 10),
          },
        },
      },
      uiMore: {
        type: 'object',
        title: 'ui:more',
        properties: {
          uiDisabled: {
            type: 'boolean',
            title: 'ui:disabled',
            default: get(currentUiSchema, 'uiMore.uiDisabled', false),
          },
          uiReadonly: {
            type: 'boolean',
            title: 'ui:readonly',
            default: get(currentUiSchema, 'uiMore.uiReadonly', false),
          },

          uiEnumDisabled: {
            type: 'boolean',
            title: 'ui:enumDisabled',
            default: get(currentUiSchema, 'uiMore.uiEnumDisabled', false),
          },
          uiInline: {
            type: 'boolean',
            title: 'inline',
            default: get(currentUiSchema, 'uiMore.uiInline', false),
          },
        },
      },
      uiOthers: {
        type: 'object',
        title: 'ui:others',
        properties: {
          uiHelp: {
            type: 'string',
            title: 'ui:help',
            default: get(currentUiSchema, 'uiOthers.uiHelp', ''),
          },
          uiTitle: {
            type: 'string',
            title: 'ui:title',
            default: get(currentUiSchema, 'uiOthers.uiTitle', ''),
          },
          uiDescription: {
            type: 'string',
            title: 'ui:description',
            default: get(currentUiSchema, 'uiOthers.uiDescription', ''),
          },
          uiAutofocus: {
            type: 'string',
            title: 'ui:autofocus',
            default: get(currentUiSchema, 'uiOthers.uiAutofocus', ''),
          },
          uiPlaceholder: {
            type: 'string',
            title: 'ui:placeholder',
            default: get(currentUiSchema, 'uiOthers.uiPlaceholder', ''),
          },
        },
      },
    },
  };

  const uiSchema = {
    uiWidget: {
      widget: { "ui:placeholder": "Choose a type" },
    },
    uiOptions: {
      inputType: { "ui:placeholder": "Choose a type" },
    },
    uiOthers: {
      "ui:options": { backgroundColor: 'gray' },
      uiPlaceholder: { "ui:placeholder": "Choose a aaa" },
    },
  };

  if (node.type === 'string') {
    stringWidgetEnum.push('file');
  }
  if (node.type === 'object') {
    schema.properties.uiOptions.properties = {
      ...schema.properties.uiOptions.properties,
      expandable: { type: 'boolean', title: 'expandable' },
    };
  }
  if (node.type === 'array') {
    schema.properties.uiOptions.properties = {
      ...schema.properties.uiOptions.properties,
      orderable: { type: 'boolean', title: 'orderable' },
      addable: { type: 'boolean', title: 'addable' },
      removable: { type: 'boolean', title: 'removable' },
    };
  }


  const onChange = data => {
    console.log('JsonFormUISettingsForm changed', data);
  };

  const onSubmit = data => {
    const { formData} = data;
    const newNode = { ...node };
    newNode.uiSchema = formData;

    const newTree = changeNodeAtPath({
      treeData: tree,
      path,
      getNodeKey,
      newNode
    });

    props.setProjectJsonForm(newTree);
    props.closeModal();
  };

  const setForm = (type, node, path) => {
    props.setNodePath({
      node,
      path,
      type,
    });
  };

  const showForm = () => {
    if (props.nodePath.type === JSON_FORM_UI_SETTINGS) {
      return (
        <Form schema={schema}
          uiSchema={uiSchema}
          onChange={onChange}
          onSubmit={onSubmit}
          onError={log("errors")}
          formData={currentUiSchema}
        />
      );
    }
    return null;
  };

  const getButtonClass = path => {
    return (isEqual(path, props.nodePath.path))
      ? 'glyphRed'
      : '';
  };

  const getButton = (node, path) => {
    if ((node.type === 'object' || node.type === 'array') && path[0] === 0) return [];
    return (
      [
        <Glyphicon
          glyph="adjust"
          onClick={() => setForm(JSON_FORM_UI_SETTINGS, node, path)}
          className={getButtonClass(path)}
        />
      ]
    );
  };

  const log = (type) => console.log.bind(console, type);
  return (
    <div className='flex mainContainer'>
      <div
        style={{
          width: '45%',
          float: 'left',
          height: '500px'
        }}
      >
        <SortableTree
          treeData={tree}
          onChange={onChange}
          dndType={externalNodeType}
          shouldCopyOnOutsideDrop={shouldCopyOnOutsideDrop}
          getNodeKey={getNodeKey}
          generateNodeProps={({ node, path }) => ({
            buttons: getButton(node, path)
          })}
        />
      </div>
      <div
        style={{
          width: '55%',
          float: 'left',
        }}
      >
        {showForm()}
      </div>
    </div>
  );
}

export default JsonFormUISettingsForm;