import { fork, all } from "redux-saga/effects";
import counterSaga from "../../services/counterService";

export default function* sagas() {
  yield all([counterSaga].map(saga => fork(saga)));
}
