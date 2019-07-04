import * as actionTypes from './actionTypes';

export const setTree = tree => ({
  type: actionTypes.SET_TREE,
  tree,
});

export const setCurrentNode = currentNode => ({
  type: actionTypes.SET_CURRENT_NODE,
  currentNode,
});

