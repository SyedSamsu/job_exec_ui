import { combineReducers } from "redux";
import LoginReducers from "./LoginReducers";

const rootReducer = combineReducers({
  login: LoginReducers
});

export default rootReducer;
