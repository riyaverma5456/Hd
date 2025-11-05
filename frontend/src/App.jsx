import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";

// === AUTH COMPONENTS ===
import Register from "./components/Layout/Register";
import Login from "./components/Layout/Login";
import Verify2FA from "./components/Layout/Verify2FA";
import NewsFeed from "./components/News/NewsFeed";

// === PAGES ===
import Dashboard from "./pages/Dashboard";
import Tutorials from "./pages/Tutorials";
import Home from "./pages/Home";
import ChatPage from "./pages/ChatPage";

// === PROTECTED ROUTE ===
function ProtectedRoute({ children }) {
  const { currentUser } = useAuth();
  const verified = localStorage.getItem("2fa_verified");
  if (!currentUser || !verified) return <Navigate to="/login" replace />;
  return children;
}

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* === PUBLIC ROUTES === */}
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/verify-2fa" element={<Verify2FA />} />
          <Route path="/news" element={<NewsFeed />} />

          {/* === PROTECTED ROUTES === */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/tutorials"
            element={
              <ProtectedRoute>
                <Tutorials />
              </ProtectedRoute>
            }
          />
          <Route
            path="/chat"
            element={
              <ProtectedRoute>
                <ChatPage />
              </ProtectedRoute>
            }
          />

          {/* === FALLBACK === */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}
