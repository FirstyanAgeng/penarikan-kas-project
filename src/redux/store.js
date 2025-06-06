import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import membersReducer from './reducers/membersReducer';
import transactionsReducer from './reducers/transactionsReducer';
import settingsReducer from './reducers/settingsReducer';
import { loadState, saveState } from '../utils/localStorage';
import throttle from 'lodash/throttle';

// Combine reducers
const rootReducer = combineReducers({
  members: membersReducer,
  transactions: transactionsReducer,
  settings: settingsReducer
});

// Load persisted state
const persistedState = loadState();

// Create store with persisted state
const store = createStore(
  rootReducer,
  persistedState,
  applyMiddleware(thunk)
);

// Save state to localStorage whenever it changes (throttled to prevent excessive writes)
store.subscribe(
  throttle(() => {
    saveState(store.getState());
  }, 1000)
);

export default store;
