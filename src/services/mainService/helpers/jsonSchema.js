import isEmpty from "lodash/isEmpty";
import { getFlatDataFromTree } from "react-sortable-tree";

export const generateJsonSchemaCode = props => {
  const { tree } = props;
  let code = "";

  const flatData = getFlatDataFromTree({
    treeData: tree,
    getNodeKey: ({ treeIndex }) => treeIndex,
    ignoreCollapsed: false
  });

  if (!isEmpty(tree) && tree[0].title) code += `{`;

  const prepareJsonFormCode = jsonForm => {
    jsonForm.map(el => {
      if (el.title) {
        let isChild = false;
        let isLastChild = false;
        let parent = null;

        const flatElement = flatData.find(element => element.node.title === el.title);

        if (!isEmpty(flatElement)) {
          parent = flatElement.parentNode;
        }

        if (!isEmpty(parent)) {
          isChild = !isEmpty(parent.children);
          isLastChild = isChild
            ? parent.children[parent.children.length - 1].title === el.title
            : false;
        }

        if (isChild && parent.type === 'object') {
          if (!isEmpty(el.title)) code += `"${el.title}": { title: '${el.title}',`;
        } else {
          if (!isEmpty(el.title)) code += `"title": '${el.title}',`;
        }

        if (!isEmpty(el.description)) code += `"description": '${el.description}',`;
        if (!isEmpty(el.type)) code += `"type": '${el.type}',`;
        if (el.type === 'array') code += `"items": [{`;
        if (el.type === 'object') code += `"properties": {`;

        if (!isEmpty(el.children)) prepareJsonFormCode(el.children);
        if ((el.type === 'array')) code += `],`;


        if (!isEmpty(el.minimum)) code += `"minimum": ${el.minimum},`;
        if (!isEmpty(el.maximum)) code += `"maximum": ${el.maximum},`;
        if (!isEmpty(el.minLength)) code += `"minLength": ${el.minLength},`;
        if (!isEmpty(el.maxLength)) code += `"maxLength": ${el.maxLength},`;
        if (!isEmpty(el.minItems)) code += `"minItems": ${el.minItems},`;
        if (!isEmpty(el.maxItems)) code += `"maxItems": ${el.maxItems},`;
        if (!isEmpty(el.isRequired)) code += `"isRequired": ${el.isRequired},`;
        if (!isEmpty(el.uniqueItems)) code += `"uniqueItems": ${el.uniqueItems},`;
        if (!isEmpty(el.multipleOf)) code += `"multipleOf": ${el.multipleOf},`;
        if (!isEmpty(el.enumVal)) code += `"enum": ${el.enumVal},`;
        if (!isEmpty(el.enumNames)) code += `"enumNames": ${el.enumNames},`;

        if (!isEmpty(parent) && (parent.type === 'array' || parent.type === 'object') && el.title) code += `},a`;

        if (( el.type === 'array' || el.type === 'object')) code += `},b`;

        if (!isEmpty(parent) && isLastChild) code += `},c`;
        if (isEmpty(parent)) code += `}d`;
      }
    });

    return code;
  };

  return prepareJsonFormCode(tree);
};
