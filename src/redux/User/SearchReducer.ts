import {
  SET_SEARCH_TEXT, CLEAR_SEARCH_TEXT, GET_SEARCH_TEXT, SET_SELECT_OPTION,
} from './SearchTypes';

const initialState = {
  searchText: '',
  selectOption: '',
};

// eslint-disable-next-line default-param-last
const reducer = (state = initialState, action: any) => {
  const { type, payload }: {type: any, payload: string} = action;

  switch (type) {
    case SET_SEARCH_TEXT:
      return { ...state, searchText: payload };
    case SET_SELECT_OPTION:
      return { ...state, selectOption: payload };
    case GET_SEARCH_TEXT:
      return { ...state };
    case CLEAR_SEARCH_TEXT:
      return { ...state, searchText: '' };
    default:
      return state;
  }
};

export default reducer;
