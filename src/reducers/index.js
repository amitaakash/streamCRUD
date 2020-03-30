import { combineReducers } from 'redux';
import authReducer from './authReducers';
import streamReducer from './streamReducer';
import { reducer as formReducer } from 'redux-form';

export const rootReducer = combineReducers({
  auth: authReducer,
  form: formReducer,
  stream: streamReducer
});
