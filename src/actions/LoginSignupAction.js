import { ActionType } from "./ActionTypes";

export const setLogin = (user) => {
  return {
    type: ActionType.LOGIN,
    payload: user,
  };
};
export const setSignup = (user) => {
  return {
    type: ActionType.SIGNUP,
    payload: user,
  };
};

export const setLogout = () => {
  return {
    type: ActionType.LOGOUT
  }
}