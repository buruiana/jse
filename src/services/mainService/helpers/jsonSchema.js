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

  if (!isEmpty(tree) && tree[0].title) code += `return {\n`;

  const prepareJsonFormCode = jsonForm => {
    jsonForm.map(el => {
      if (el.title) {
        let isChild = false;
        let isLastChild = false;
        let parent = null;

        const flatElement = flatData.find(
          element => element.node.title === el.title
        );

        if (!isEmpty(flatElement)) {
          parent = flatElement.parentNode;
        }

        if (!isEmpty(parent)) {
          isChild = !isEmpty(parent.children);
          isLastChild = isChild
            ? parent.children[parent.children.length - 1].title === el.title
            : false;
        }

        if (isChild) {
          if (!isEmpty(el.title))
            code += `${el.title}: { title: '${el.title}',`;
        } else {
          if (!isEmpty(el.title)) code += `title: '${el.title}',`;
        }

        if (!isEmpty(el.description))
          code += `description: '${el.description}',\n`;
        if (!isEmpty(el.type)) code += `type: '${el.type}',\n`;
        if (el.type === "array") code += `items: {\n`;
        if (el.type === "object") code += `properties: {\n`;

        if (!isEmpty(el.children)) prepareJsonFormCode(el.children);

        if (!isEmpty(el.minimum)) code += `minimum: ${el.minimum},\n`;
        if (!isEmpty(el.maximum)) code += `maximum: ${el.maximum},\n`;
        if (!isEmpty(el.minLength)) code += `minLength: ${el.minLength},\n`;
        if (!isEmpty(el.maxLength)) code += `maxLength: ${el.maxLength},\n`;
        if (!isEmpty(el.minItems)) code += `minItems: ${el.minItems},\n`;
        if (!isEmpty(el.maxItems)) code += `maxItems: ${el.maxItems},\n`;
        if (!isEmpty(el.isRequired)) code += `isRequired: ${el.isRequired},\n`;
        if (!isEmpty(el.uniqueItems))
          code += `uniqueItems: ${el.uniqueItems},\n`;
        if (!isEmpty(el.multipleOf)) code += `multipleOf: ${el.multipleOf},\n`;
        if (!isEmpty(el.enumVal)) code += `enum: ${el.enumVal},\n`;
        if (!isEmpty(el.enumNames)) code += `enumNames: ${el.enumNames},\n`;

        if (
          !isEmpty(parent) &&
          (parent.type === "array" || parent.type === "object") &&
          el.title
        )
          code += `},\n`;
        if (
          (el.type === "array" || el.type === "object") &&
          isEmpty(el.children)
        )
          code += `},\n`;
        if (!isEmpty(parent) && isLastChild) code += `},\n`;
        if (isEmpty(parent)) code += `};\n`;
      }
    });

    return code;
  };

  return prepareJsonFormCode(tree);
};
