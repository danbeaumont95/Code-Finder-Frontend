import { AppDispatch } from '../store';
import { SET_SEARCH_TEXT, SET_SELECT_OPTION } from './SearchTypes';

export const setSearchTextAction = (text: string) => (dispatch: AppDispatch) => {
  dispatch({
    type: SET_SEARCH_TEXT,
    payload: text,
  });
};

export const setSelectOption = (text: string) => (dispatch: AppDispatch) => {
  dispatch({
    type: SET_SELECT_OPTION,
    payload: text,
  });
};
