import { call, put, takeLatest, select } from 'redux-saga/effects';
import { SET_TREE } from './actionTypes';

export function* watchSetTree(action) {
  console.log('console: saga', action);
}

export default function* rootSaga() {
  yield takeLatest(SET_TREE, watchSetTree);
}
