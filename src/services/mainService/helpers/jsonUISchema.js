import isEmpty from "lodash/isEmpty";
import has from "lodash/has";
import get from "lodash/get";
import { getFlatDataFromTree } from "react-sortable-tree";

export const generateJsonUISchemaCode = props => {
  const { tree } = props;
  let code = "";

  const flatData = getFlatDataFromTree({
    treeData: tree,
    getNodeKey: ({ treeIndex }) => treeIndex,
    ignoreCollapsed: false
  });

  if (!isEmpty(tree) && tree[0].title) code += `{\n`;

  const prepareJsonFormCode = jsonForm => {
    jsonForm.map(el => {
      if (el.title) {
        let isChild,
          isLastChild = false;
        let parent = null;
        const uiSchema = get(el, "uiSchema", null);
        const flatElement = flatData.find(
          element => element.node.title === el.title
        );

        const hasUiOptions =
          !isEmpty(uiSchema) &&
          (uiSchema.uiMore.uiInline ||
            uiSchema.uiOptions.backgroundColor ||
            uiSchema.uiOptions.classNames ||
            uiSchema.uiOptions.inputType ||
            uiSchema.uiOptions.label ||
            uiOptions.rows);

        if (!isEmpty(flatElement)) parent = flatElement.parentNode;
        if (!isEmpty(parent)) {
          isChild = !isEmpty(parent.children);
          isLastChild = isChild
            ? parent.children[parent.children.length - 1].title === el.title
            : false;
        }

        if (!isEmpty(el.title)) code += `${el.title}: {`;
        if (el.type === "array") code += `items: {\n`;
        if (el.type === "object") code += `properties: {\n`;

        if (!isEmpty(el.children)) prepareJsonFormCode(el.children);

        if (has(uiSchema, "uiMore.uiDisabled") && uiSchema.uiMore.uiDisabled)
          code += `"ui:disabled": true,\n`;
        if (
          has(uiSchema, "uiMore.uiEnumDisabled") &&
          uiSchema.uiMore.uiEnumDisabled
        )
          code += `'ui:enumDisabled': '${uiSchema.uiMore.uiEnumDisabled}',\n`;
        if (has(uiSchema, "uiMore.uiReadonly") && uiSchema.uiMore.uiReadonly)
          code += `'ui:readonly': true,\n`;

        // uiOptions
        if (hasUiOptions) code += `'ui:options': {\n`;

        if (has(uiSchema, "uiOptions.uiInline") && uiSchema.uiMore.uiInline)
          code += `inline: ${uiSchema.uiMore.uiInline},\n`;
        if (
          has(uiSchema, "uiOptions.backgroundColor") &&
          uiSchema.uiOptions.backgroundColor
        )
          code += `backgroundColor: '${uiSchema.uiOptions.backgroundColor}',\n`;
        if (
          has(uiSchema, "uiOptions.classNames") &&
          uiSchema.uiOptions.classNames
        )
          code += `classNames: '${uiSchema.uiOptions.classNames}',\n`;
        if (
          has(uiSchema, "uiOptions.inputType") &&
          uiSchema.uiOptions.inputType
        )
          code += `inputType: '${uiSchema.uiOptions.inputType}',\n`;
        if (has(uiSchema, "uiOptions.label") && uiSchema.uiOptions.label)
          code += `label: '${uiSchema.uiOptions.label}',\n`;
        if (has(uiSchema, "uiOptions.rows") && uiSchema.uiOptions.rows)
          code += `rows: ${uiSchema.uiOptions.rows},\n`;

        if (hasUiOptions) code += `},\n`;

        // other options
        if (
          has(uiSchema, "uiOthers.uiAutofocus") &&
          uiSchema.uiOthers.uiAutofocus
        )
          code += `'ui:autofocus': ${uiSchema.uiOthers.uiAutofocus},\n`;
        if (
          has(uiSchema, "uiOthers.uiDescription") &&
          uiSchema.uiOthers.uiDescription
        )
          code += `'ui:description': '${uiSchema.uiOthers.uiDescription}',\n`;
        if (has(uiSchema, "uiOthers.uiTitle") && uiSchema.uiOthers.uiTitle)
          code += `'ui:title': '${uiSchema.uiOthers.uiTitle}',\n`;
        if (has(uiSchema, "uiOthers.uiHelp") && uiSchema.uiOthers.uiHelp)
          code += `'ui:help': '${uiSchema.uiOthers.uiHelp}',\n`;
        if (
          has(uiSchema, "uiOthers.uiPlaceholder") &&
          uiSchema.uiOthers.uiPlaceholder
        )
          code += `'ui:placeholder': '${uiSchema.uiOthers.uiPlaceholder}',\n`;

        if (has(uiSchema, "uiWidget.widget") && uiSchema.uiWidget.widget)
          code += `'ui:widget': '${uiSchema.uiWidget.widget}',\n`;

        if (
          isEmpty(parent) &&
          (el.type !== "array" || el.type !== "object") &&
          el.title
        )
          code += `},\n`;
        if (
          !isEmpty(parent) &&
          (parent.type === "array" || parent.type === "object") &&
          el.title
        )
          code += `},\n`;
        if (
          (el.type === "array" || el.type === "object") &&
          isEmpty(el.children) &&
          el.title
        )
          code += `},\n`;
        //if (!isEmpty(parent) && !isLastChild && el.title) code += `},\n`;
        if (!isEmpty(parent) && isLastChild && el.title) code += `},\n`;
        if (isEmpty(parent)) code += `};\n`;
      }
    });

    return code;
  };

  return prepareJsonFormCode(tree);
};
