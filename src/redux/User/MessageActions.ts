import { SET_MESSAGE, CLEAR_MESSAGE, GET_MESSAGE } from './UserTypes';

export const setMessage = (message: any) => ({
  type: SET_MESSAGE,
  payload: message,
});
export const getMessage = (message: any) => ({
  type: GET_MESSAGE,
  payload: message,
});

export const clearMessage: any = (placeholder: string) => (dispatch: any) => dispatch({
  type: CLEAR_MESSAGE,
  payload: placeholder,
});
