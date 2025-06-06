import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess, mockGoogleLogin } from "../redux/actions/authActions";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === "admin" && password === "admin") {
      dispatch(loginSuccess({ name: "Admin", email: "admin@example.com" }));
    } else {
      alert("Username atau password salah (admin/admin)");
    }
  };

  const handleGoogleLogin = () => {
    dispatch(mockGoogleLogin());
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-purple-600 to-indigo-800">
      <div className="w-full max-w-sm mx-4 bg-white rounded-2xl shadow-2xl p-8">
        <div className="mx-auto bg-purple-500 rounded-full w-20 h-20 flex items-center justify-center mb-6 transform -translate-y-16 shadow-xl border-4 border-white">
          <span className="text-white text-4xl">💰</span>
        </div>

        <div className="text-center -mt-10 mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Selamat Datang
          </h2>
          <p className="text-gray-600">Silakan masuk ke akun Anda</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <div className="relative">
              <input
                type="text"
                placeholder="Username"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent pl-10"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                👤
              </span>
            </div>
          </div>
          <div>
            <div className="relative">
              <input
                type="password"
                placeholder="Password"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent pl-10"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                🔒
              </span>
            </div>
          </div>
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="form-checkbox h-4 w-4 text-purple-500 rounded focus:ring-2 focus:ring-purple-500"
              />
              <span className="ml-2 text-gray-700">Ingat saya</span>
            </label>
            <button type="button" className="text-purple-600 hover:text-purple-700 hover:underline">
              Lupa password?
            </button>
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold py-3 rounded-lg shadow-md hover:from-purple-700 hover:to-indigo-700 transition duration-300 transform hover:scale-[1.02]"
          >
            Masuk
          </button>
        </form>

        <div className="my-6 text-center">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="px-2 bg-white text-sm text-gray-500">atau</span>
            </div>
          </div>
        </div>

        <button
          onClick={handleGoogleLogin}
          className="w-full bg-white border border-gray-300 text-gray-700 py-3 rounded-lg flex items-center justify-center space-x-2 shadow-sm hover:bg-gray-50 transition duration-300 transform hover:scale-[1.02]"
        >
          <img
            src="https://www.google.com/favicon.ico"
            alt="Google"
            className="w-5 h-5"
          />
          <span>Masuk dengan Google</span>
        </button>

        <p className="mt-6 text-center text-sm text-gray-600">
          Belum punya akun?{" "}
          <button className="text-purple-600 hover:text-purple-700 font-semibold hover:underline">
            Daftar sekarang
          </button>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
