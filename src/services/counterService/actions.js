import * as actionTypes from './actionTypes';

export const setCounter = counter => ({
  type: actionTypes.SET_COUNTER,
  counter,
});
