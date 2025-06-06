import { combineReducers } from 'redux';
import authReducer from './authReducer';
import membersReducer from './membersReducer';
import transactionsReducer from './transactionsReducer';
import settingsReducer from './settingsReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  members: membersReducer,
  transactions: transactionsReducer,
  settings: settingsReducer
});

export default rootReducer; 