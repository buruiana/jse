import { combineReducers } from "redux";
import counterReducer from "../../services/counterService/reducer";

export default history =>
  combineReducers({
    counterReducer
  });
