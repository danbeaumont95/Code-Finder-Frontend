import { RootState } from "../store";
import { SET_MESSAGE, CLEAR_MESSAGE } from "./UserTypes";

export const setMessage = (message: RootState) => ({
  type: SET_MESSAGE,
  payload: message,
});

export const clearMessage = () => ({
  type: CLEAR_MESSAGE,
});
