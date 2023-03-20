/* eslint-disable max-len */
import {
  LOAD_CURRENT_USER, REGISTER_FAIL, REGISTER_SUCCESS, SET_MESSAGE, LOGIN_SUCCESS,
} from './UserTypes';

import UserService from '../../Services/user';
import { UserToLogin, UserToSignUp } from '../../Components/interfaces';
import { AppDispatch } from '../store';

export const loadCurrentUser = (user: UserToSignUp) => ({
  type: LOAD_CURRENT_USER,
  payload: user,
});

export const register = (user: UserToSignUp) => (dispatch: AppDispatch, getState: any) => UserService.register(user).then(
  (response: any) => {
    dispatch({
      type: REGISTER_SUCCESS,
    });

    dispatch({
      type: SET_MESSAGE,
      payload: response.data.message,
    });

    const { message } = getState();
    return Promise.resolve(message);
  },
  (error: any) => {
    const message = (error.response
          && error.response.data
          && error.response.data.message)
        || error.message
        || error.toString();

    dispatch({
      type: REGISTER_FAIL,
    });

    dispatch({
      type: SET_MESSAGE,
      payload: message,
    });

    return Promise.reject();
  },
);

export const login = (user: UserToLogin) => (dispatch: AppDispatch, getState: any) => UserService.login(user).then(
  (response: any) => {
    dispatch({
      type: LOGIN_SUCCESS,
    });
    dispatch({
      type: SET_MESSAGE,
      payload: response.data,
    });

    const { message } = getState();
    return Promise.resolve(message);
  },
  (error: any) => {
    const message = (error.response
          && error.response.data
          && error.response.data.message)
        || error.message
        || error.toString();

    dispatch({
      type: REGISTER_FAIL,
    });

    dispatch({
      type: SET_MESSAGE,
      payload: message,
    });

    return Promise.reject();
  },
);

// export const removeMessge = () => (dispatch: any) => {

// };
