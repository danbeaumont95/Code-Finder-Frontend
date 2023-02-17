import { CodeSnippet, CodeSnippetToCreate } from "../../Components/interfaces";
import CodeSnippetsService from "../../Services/codeSnippets";
import { AppDispatch } from "../store";
import { SET_CODE_SNIPPETS, UPDATE_CODE_SNIPPETS, SAVE_CODE_SNIPPETS } from './CodeSnippetsTypes'
import {  SET_MESSAGE } from "./UserTypes";

export const setCodeSnippets = (token: string) =>(dispatch: AppDispatch, getState: any) => {
  return CodeSnippetsService.getCodeSnippets(token).then(
    (response: any) => {
      dispatch({
        type: SET_CODE_SNIPPETS,
        payload: response.data.data
      })
      const state = getState();
      return Promise.resolve(state);
    }
  )
}

export const updateCodeSnippet = (value: string, id: string) => (dispatch: AppDispatch, getState: any) => {
  dispatch({
    type: UPDATE_CODE_SNIPPETS,
    payload: {value, id}
  })
}

export const saveCodeSnippet = (token: string, code: CodeSnippet) => (dispatch: AppDispatch, getState: any) => {

  return CodeSnippetsService.saveCodeSnippet(token, code)
    .then((response) => {
      dispatch({
        type: SAVE_CODE_SNIPPETS,
        payload: response.data.data
      })
      dispatch({
        type: SET_MESSAGE,
        payload: response.data.message,
      });

      const { message } = getState();
      return Promise.resolve(message);
    })
}

export const createCodeSnippet = (token: string, code: CodeSnippetToCreate) => (dispatch: AppDispatch, getState: any) => {
  return CodeSnippetsService.createCodeSnippet(token, code)
    .then((response) => {
      console.log(response, 'response create code snippet')
      const state = getState();
      // console.log(test.codeSnippets.codeSnippets,'test')
      const {codeSnippets: {codeSnippets}} = state;
      console.log(codeSnippets, 'codeSnippets123')
      // const newArr = [];
      // newArr.push(codeSnippets)
      // newArr.push(code);
      const returnArr = [...codeSnippets, code];
      console.log(returnArr, 'returnarr')
      dispatch({
        type: SET_CODE_SNIPPETS,
        payload:returnArr
      })
      return Promise.resolve(response.data.message)
    })
}
