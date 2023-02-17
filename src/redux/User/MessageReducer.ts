import { omit } from 'lodash'
import { PlaceholderLookup } from '../../Components/interfaces';
import { CLEAR_MESSAGE, SET_MESSAGE, GET_MESSAGE } from "./UserTypes";

const placeholderLookup = {
  'First Name': 'first_name',
  'Last Name': 'last_name',
  'Email': 'email',
  'Password': 'password'
}

const initialState = {
  message: ''
};

const reducer = (state: any = initialState, action: any) => {
  const { type, payload }: {type: any, payload: keyof PlaceholderLookup} = action;

  switch (type) {
    case SET_MESSAGE:
      return { message: payload };
      
    case CLEAR_MESSAGE:

      return {
        ...state,
        message: omit(state.message, placeholderLookup[payload])
      }
    case GET_MESSAGE:
      return state
    default:
      return state;
  }
}

export default reducer
