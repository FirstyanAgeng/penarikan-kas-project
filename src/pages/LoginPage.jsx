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
    // Handle navigation in useEffect instead of during render
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = (e) => {
    e.preventDefault();
    // Simple mock login (no actual validation)
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 to-indigo-800">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-sm text-center">
        <div className="mx-auto bg-purple-500 rounded-full w-20 h-20 flex items-center justify-center mb-6">
          <span className="text-white text-3xl">🔑</span> {/* Icon */}
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          Selamat Datang
        </h2>
        <p className="text-gray-600 mb-6">Silakan masuk ke akun Anda</p>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <div className="relative">
              <input
                type="text"
                placeholder="Masukkan username atau email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500 pl-10"
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
                placeholder="Masukkan password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500 pl-10 pr-10"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                🔒
              </span>
              {/* Eye icon for show/hide password (implement toggle logic if needed) */}
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer">
                👁️
              </span>
            </div>
          </div>
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="mr-2 rounded text-purple-500 focus:ring-purple-500"
              />
              Ingat saya
            </label>
            <a href="#" className="text-purple-600 hover:underline">
              Lupa password?
            </a>
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold py-3 rounded-lg shadow-md hover:from-purple-700 hover:to-indigo-700 transition duration-300"
          >
            Masuk
          </button>
        </form>

        <div className="my-6 text-gray-500 flex items-center justify-center">
          <span className="border-t border-gray-300 flex-grow mr-2"></span>
          atau
          <span className="border-t border-gray-300 flex-grow ml-2"></span>
        </div>

        <div className="flex flex-col space-y-3">
          <button
            onClick={handleGoogleLogin}
            className="w-full bg-white border border-gray-300 text-gray-700 py-3 rounded-lg flex items-center justify-center space-x-2 shadow-sm hover:bg-gray-50 transition duration-300"
          >
            <img
              src="https://www.google.com/favicon.ico"
              alt="Google"
              className="w-5 h-5"
            />
            <span>Google</span>
          </button>
          <button
            // onClick={() => alert('Simulasi Facebook login')} // Add Facebook mock if needed
            className="w-full bg-white border border-gray-300 text-gray-700 py-3 rounded-lg flex items-center justify-center space-x-2 shadow-sm hover:bg-gray-50 transition duration-300"
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/1200px-Facebook_Logo_%282019%29.png"
              alt="Facebook"
              className="w-5 h-5"
            />
            <span>Facebook</span>
          </button>
        </div>

        <p className="mt-6 text-sm text-gray-600">
          Belum punya akun?{" "}
          <a href="#" className="text-purple-600 hover:underline font-semibold">
            Daftar sekarang
          </a>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
