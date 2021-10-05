import { combineReducers } from 'redux';
import filmReducer from './filmReducer';

const rootReducer = combineReducers({
  film: filmReducer,
});

export default rootReducer;
