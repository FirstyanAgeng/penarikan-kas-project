import { LOGIN_SUCCESS, LOGOUT } from '../constants/index';

const initialState = {
  isAuthenticated: false,
  user: null, // { name: 'Admin', email: 'admin@example.com' } or from mock Google login
  error: null
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
        error: null
      };
    case LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        error: null
      };
    default:
      return state;
  }
};

export default authReducer;
