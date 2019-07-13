import { call, put, takeLatest, select } from "redux-saga/effects";
import axios from "axios";
import { SET_TREE } from "./actionTypes";
import { generateJsonSchemaCode } from "./helpers/jsonSchema";
import { generateJsonUISchemaCode } from "./helpers/jsonUISchema";
import { setUISchemaCode, setSchemaCode } from "./actions";

export function* watchSetTree(action) {
  console.log("console: saga", action);
}

const prettify = (code, parser = "babel") => {
  return axios.post("http://localhost:5000/api/prettify", code, parser);
};

export function* watchSetJsonForm() {
  const { tree } = (yield select()).mainReducer;
  const parser = "babel";
  const jsonFormSchemaCode = generateJsonSchemaCode({ tree });
  console.log("console: jsonFormSchemaCode", jsonFormSchemaCode);
  const jsonFormUISchemaCode = generateJsonUISchemaCode({ tree });
  const prettyJsonFormSchemaCode = yield prettify({
    code: jsonFormSchemaCode,
    parser
  });
  const prettyJsonFormUISchemaCode = yield prettify({
    code: jsonFormUISchemaCode,
    parser
  });
  console.log("console: jsonFormUISchemaCode", jsonFormUISchemaCode);
  yield put(setSchemaCode(prettyJsonFormSchemaCode));
  yield put(setUISchemaCode(prettyJsonFormUISchemaCode));
}

export default function* rootSaga() {
  yield takeLatest(SET_TREE, watchSetJsonForm);
}
