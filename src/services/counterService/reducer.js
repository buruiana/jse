import * as actionTypes from './actionTypes';

export const initialState = () => ({
  counter: 0,
});

export default (state = initialState(), action) => {
  switch (action.type) {
    case actionTypes.SET_COUNTER:
      return {
        ...state,
        counter: action.counter,
      };
    default:
      return state;
  }
};
