import { call, put, takeLatest, select } from 'redux-saga/effects';
import { SET_COUNTER } from './actionTypes';

export function* watchSetCounter(action) {
  console.log('console: saga', action);
}

export default function* rootSaga() {
  yield takeLatest(SET_COUNTER, watchSetCounter);
}
