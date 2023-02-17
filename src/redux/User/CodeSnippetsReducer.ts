import { SET_CODE_SNIPPETS, UPDATE_CODE_SNIPPETS, SAVE_CODE_SNIPPETS } from './CodeSnippetsTypes';

const initialState: any = {
  codeSnippets: []
}

const reducer = (state = initialState, action: any) => {
  const { type, payload }: {type: any, payload: string} = action;

  switch(type) {
    case SET_CODE_SNIPPETS:
      return {codeSnippets: payload}
    case UPDATE_CODE_SNIPPETS:
      const index = state.codeSnippets.findIndex((post: any) => post.id === action.payload.id)

      const returnVal = [
        ...state.codeSnippets.slice(0, index), // everything before current post
        {
           ...state.codeSnippets[index],
           code:action.payload.value
        },
        ...state.codeSnippets.slice(index + 1), // everything after current post
     ]
     return {codeSnippets: returnVal}
    
     case SAVE_CODE_SNIPPETS: 
      return state
    default:
      return state;
  }
}

export default reducer;
