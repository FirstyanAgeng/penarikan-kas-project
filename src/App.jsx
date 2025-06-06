import React, { useState, useRef, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link,
  useLocation,
  useNavigate
} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "./redux/actions/authActions";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import SettingsPage from "./components/Settings/SettingsPage";
// import MembersPage from "./pages/MembersPage"; // Untuk halaman manajemen anggota
// import PaymentPage from "./pages/PaymentPage"; // Jika ingin input pembayaran di halaman terpisah

const PrivateRoute = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  return isAuthenticated ? children : <Navigate to="/login" />;
};

const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 p-2 rounded-lg hover:bg-white/10 transition-colors"
      >
        <span className="text-xl">👤</span>
        <span className="hidden sm:block">{user?.name || 'User'}</span>
        <span className="text-sm">▼</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-50">
          <div className="px-4 py-2 border-b">
            <p className="text-sm font-medium text-gray-900">{user?.name}</p>
            <p className="text-xs text-gray-500">{user?.email}</p>
          </div>
          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50 flex items-center space-x-2"
          >
            <span>🚪</span>
            <span>Keluar</span>
          </button>
        </div>
      )}
    </div>
  );
};

const Navigation = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  if (!isAuthenticated) return null;

  const navLinks = [
    { path: "/", label: "Dashboard", icon: "📊" },
    { path: "/settings", label: "Pengaturan", icon: "⚙️" }
  ];
  
  return (
    <header className="bg-gradient-to-r from-purple-600 to-indigo-800 text-white shadow-lg">
      {/* Main Navigation */}
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 flex-shrink-0">
            <span className="text-2xl">💰</span>
            <span className="font-bold text-xl hidden sm:block">Kas App</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  location.pathname === link.path
                    ? "bg-white text-purple-600"
                    : "hover:bg-white/10"
                }`}
              >
                <span className="flex items-center space-x-2">
                  <span>{link.icon}</span>
                  <span>{link.label}</span>
                </span>
              </Link>
            ))}
          </div>

          {/* User Menu */}
          <UserMenu />

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
          >
            <span className="text-2xl">{isMobileMenuOpen ? "✕" : "☰"}</span>
          </button>
        </nav>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-indigo-900/95 border-t border-white/10">
          <div className="container mx-auto px-4 py-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-4 py-3 rounded-lg mb-1 transition-colors ${
                  location.pathname === link.path
                    ? "bg-white text-purple-600"
                    : "hover:bg-white/10"
                }`}
              >
                <span className="flex items-center space-x-3">
                  <span className="text-xl">{link.icon}</span>
                  <span>{link.label}</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navigation />
        <main className="container mx-auto px-4 py-6">
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <DashboardPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/settings"
              element={
                <PrivateRoute>
                  <SettingsPage />
                </PrivateRoute>
              }
            />
            {/* <Route
              path="/members"
              element={
                <PrivateRoute>
                  <MembersPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/payment"
              element={
                <PrivateRoute>
                  <PaymentPage />
                </PrivateRoute>
              }
            /> */}
            {/* Tambahkan rute lain jika diperlukan */}
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
