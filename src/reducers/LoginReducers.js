import { ActionType } from "../actions/ActionTypes";

const initialState = {
  user: [],
  isLoggedIn: localStorage.getItem("isLoggedIn"),
  role: localStorage.getItem("role")
};

const LoginReducers = (state = initialState, action) => {
  let newState = {...state};
  switch (action.type) {
    case ActionType.LOGIN:
      newState.user = action.payload;
      newState.isLoggedIn=localStorage.getItem("isLoggedIn");
      newState.role=localStorage.getItem("role");
      break;
    case ActionType.SIGNUP:
      newState.user = action.payload;
      newState.isLoggedIn=localStorage.getItem("isLoggedIn");
      newState.role=localStorage.getItem("role");
      break;
    case ActionType.LOGOUT:
      newState.user=[];
      newState.isLoggedIn=localStorage.getItem("isLoggedIn");
      newState.role=localStorage.getItem("role");
      break;
    default:
      newState = state;
  }
  return newState;
};

export default LoginReducers
