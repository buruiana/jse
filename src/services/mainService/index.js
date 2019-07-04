import { call, put, takeLatest, select } from "redux-saga/effects";
import { SET_TREE } from "./actionTypes";
import { generateJsonSchemaCode } from "./helpers/jsonSchema";
import { generateJsonUISchemaCode } from "./helpers/jsonUISchema";
import { setUISchemaCode, setSchemaCode } from "./actions";

export function* watchSetTree(action) {
  console.log("console: saga", action);
}

export function* watchSetJsonForm() {
  const { tree } = (yield select()).mainReducer;
  const jsonFormSchemaCode = generateJsonSchemaCode({ tree });

  const jsonFormUISchemaCode = generateJsonUISchemaCode({ tree });
  //const schemaCode = yield call(getPrettyCode, jsonFormSchemaCode);
  //const uiSchemaCode = yield call(getPrettyCode, jsonFormUISchemaCode);
  yield put(setSchemaCode(jsonFormSchemaCode));
  yield put(setUISchemaCode(jsonFormUISchemaCode));
}

export default function* rootSaga() {
  yield takeLatest(SET_TREE, watchSetJsonForm);
}
