import { LOGIN_SUCCESS, LOGOUT } from "../constants";

export const loginSuccess = (user) => ({
  type: LOGIN_SUCCESS,
  payload: user,
});

export const logout = () => ({
  type: LOGOUT,
});

export const mockGoogleLogin = () => (dispatch) => {
  // Simulate a successful Google login
  const mockUser = {
    name: "Google User",
    email: "google.user@example.com",
    id: "mockGoogleId123",
    avatar: "https://via.placeholder.com/40/007bff/ffffff?text=G", // Placeholder avatar
  };
  dispatch(loginSuccess(mockUser));
  // In a real app, this would involve OAuth flow and receiving user data from Google.
};
