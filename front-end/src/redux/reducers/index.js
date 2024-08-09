import { combineReducers } from 'redux';
import authReducer from './authReducer';
import tagsReducer from './tagsReducer';
import blogsReducer from './blogsReducer';


const rootReducer = combineReducers({
  auth: authReducer,
  tags: tagsReducer,
  blogs: blogsReducer
});

export default rootReducer;
