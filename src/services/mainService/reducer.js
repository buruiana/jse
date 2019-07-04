import * as actionTypes from './actionTypes';

export const initialState = () => ({
  tree: [],
  currentNode: [],
});

export default (state = initialState(), action) => {
  switch (action.type) {
    case actionTypes.SET_TREE:
      return {
        ...state,
        tree: action.tree,
      };
    case actionTypes.SET_CURRENT_NODE:
      return {
        ...state,
        currentNode: action.currentNode,
      };
    default:
      return state;
  }
};
