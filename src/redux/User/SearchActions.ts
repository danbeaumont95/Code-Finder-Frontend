import { AppDispatch } from "../store";
import { SET_SEARCH_TEXT, SET_SELECT_OPTION } from './SearchTypes'

export const setSearchTextAction = (text: string) => (dispatch: AppDispatch, getState: any) => {
  console.log(text, 'textSetSerach')
  dispatch({
      type: SET_SEARCH_TEXT,
      payload: text
    })
}

export const setSelectOption = (text: string) => (dispatch: AppDispatch, getState: any) => {
  console.log(text, 'text123')
  dispatch({
    type: SET_SELECT_OPTION,
    payload: text
  })
}
