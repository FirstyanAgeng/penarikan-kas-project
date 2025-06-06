import { LOGIN_SUCCESS, LOGOUT } from '../constants/actionTypes';

export const loginSuccess = (user) => ({
  type: LOGIN_SUCCESS,
  payload: user,
});

export const logout = () => ({
  type: LOGOUT,
});

// Mock Google login for demonstration
export const mockGoogleLogin = () => {
  return (dispatch) => {
    // Simulate Google login with mock data
    const mockUser = {
      name: "Google User",
      email: "user@gmail.com",
      photoURL: "https://example.com/photo.jpg",
    };
    dispatch(loginSuccess(mockUser));
  };
};
