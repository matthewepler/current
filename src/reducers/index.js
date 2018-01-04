import { combineReducers } from 'redux';
import inputField from './inputField';
import app from './app';

const rootReducer = combineReducers({
  inputField,
  app,
});

export default rootReducer;
