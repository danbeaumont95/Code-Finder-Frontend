// eslint-disable-next-line import/no-extraneous-dependencies
import { combineReducers } from 'redux';
import UserReducer from './User/UserReducer';
import MessageReducer from './User/MessageReducer';
import SearchReducer from './User/SearchReducer';
import CodeSnippetsReducer from './User/CodeSnippetsReducer';

const rootReducer = combineReducers({
  user: UserReducer,
  message: MessageReducer,
  search: SearchReducer,
  codeSnippets: CodeSnippetsReducer,
});

export default rootReducer;
