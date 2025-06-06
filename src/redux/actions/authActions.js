import { LOGIN_SUCCESS, LOGOUT } from '../constants/index';

export const loginSuccess = (userData) => ({
  type: LOGIN_SUCCESS,
  payload: userData
});

export const logout = () => ({
  type: LOGOUT
});

// Mock Google login for demonstration
export const mockGoogleLogin = () => (dispatch) => {
  const mockUserData = {
    name: 'Google User',
    email: 'user@gmail.com',
    provider: 'google'
  };
  
  dispatch(loginSuccess(mockUserData));
};
