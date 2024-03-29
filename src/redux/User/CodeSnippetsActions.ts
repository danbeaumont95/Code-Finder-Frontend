import { CodeSnippet, CodeSnippetToCreate } from '../../Components/interfaces';
import CodeSnippetsService from '../../Services/codeSnippets';
import { AppDispatch } from '../store';
import { SET_CODE_SNIPPETS, UPDATE_CODE_SNIPPETS, SAVE_CODE_SNIPPETS } from './CodeSnippetsTypes';
import { SET_MESSAGE } from './UserTypes';

// eslint-disable-next-line max-len
export const setCodeSnippets = (token: string) => (dispatch: AppDispatch, getState: any) => CodeSnippetsService.getCodeSnippets(token).then(
  (response: any) => {
    dispatch({
      type: SET_CODE_SNIPPETS,
      payload: response.data.data,
    });
    const state = getState();
    return Promise.resolve(state);
  },
);

// eslint-disable-next-line max-len
export const updateCodeSnippet = (value: string, id: string) => (dispatch: AppDispatch) => {
  dispatch({
    type: UPDATE_CODE_SNIPPETS,
    payload: { value, id },
  });
};

// eslint-disable-next-line max-len
export const saveCodeSnippet = (token: string, code: CodeSnippet) => (dispatch: AppDispatch, getState: any) => CodeSnippetsService.saveCodeSnippet(token, code)
  .then((response) => {
    dispatch({
      type: SAVE_CODE_SNIPPETS,
      payload: response.data.data,
    });
    dispatch({
      type: SET_MESSAGE,
      payload: response.data.message,
    });

    const { message } = getState();
    return Promise.resolve(message);
  });

// eslint-disable-next-line max-len
export const createCodeSnippet = (token: string, code: CodeSnippetToCreate) => (dispatch: AppDispatch, getState: any) => CodeSnippetsService.createCodeSnippet(token, code)
  .then((response) => {
    const state = getState();

    const { codeSnippets: { codeSnippets } } = state;

    // const newArr = [];
    // newArr.push(codeSnippets)
    // newArr.push(code);
    const returnArr = [...codeSnippets, code];

    dispatch({
      type: SET_CODE_SNIPPETS,
      payload: returnArr,
    });
    return Promise.resolve(response.data.message);
  });
