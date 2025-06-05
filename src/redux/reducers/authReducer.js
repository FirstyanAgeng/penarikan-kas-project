import { LOGIN_SUCCESS, LOGOUT } from "../constants";

const initialState = {
  isAuthenticated: false,
  user: null, // { name: 'Admin', email: 'admin@example.com' } or from mock Google login
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
      };
    case LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    default:
      return state;
  }
};

export default authReducer;
