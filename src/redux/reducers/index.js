import { combineReducers } from "redux";
import counterReducer from "../../services/counterService/reducer";

export default () =>
  combineReducers({
    counterReducer
  });
