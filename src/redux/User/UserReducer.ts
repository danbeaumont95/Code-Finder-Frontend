import { LOAD_CURRENT_USER, REGISTER_SUCCESS, REGISTER_FAIL, LOGIN_SUCCESS } from './UserTypes';

const user = JSON.parse(localStorage.getItem("user") ?? '{}');

const initialState = {
  currentUser: '',
  user: user ? { isLoggedIn: false, user } : { isLoggedIn: false, user: null },
}

const reducer = (state = initialState, action: any) => {
  switch(action.type) {
    case LOAD_CURRENT_USER:
      return {
        ...state,
        currentUser: state.currentUser
      };
      case REGISTER_SUCCESS:
        return {
          ...state,
          isLoggedIn: false,
        };
      case REGISTER_FAIL:
        return {
          ...state,
          isLoggedIn: false,
        };
      case LOGIN_SUCCESS:
        return {
          ...state,
          isLoggedIn: true
        }
      default:
        return state
  }
  
}

export default reducer
