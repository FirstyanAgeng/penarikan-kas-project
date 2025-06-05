import { createStore, combineReducers, applyMiddleware } from "redux";
import { thunk } from "redux-thunk"; // Import thunk correctly
import authReducer from "./reducers/authReducer";
import membersReducer from "./reducers/membersReducer";
import transactionsReducer from "./reducers/transactionsReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  members: membersReducer,
  transactions: transactionsReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
