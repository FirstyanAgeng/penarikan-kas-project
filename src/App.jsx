import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
// import MembersPage from "./pages/MembersPage"; // Untuk halaman manajemen anggota
// import PaymentPage from "./pages/PaymentPage"; // Jika ingin input pembayaran di halaman terpisah

const PrivateRoute = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  return isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
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
    </Router>
  );
}

export default App;
