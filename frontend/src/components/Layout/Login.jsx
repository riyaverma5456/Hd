// src/pages/Auth/Login.jsx
import React, { useState } from "react";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../firebase/config";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);

      const res = await fetch("https://hd-x2di.onrender.com/send-2fa", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (!data.success) throw new Error("Failed to send 2FA code");

      localStorage.setItem("2fa_email", email);
      navigate("/verify-2fa");
    } catch (err) {
      console.error("Login error:", err);
      alert(err.message || "Login failed");
    }
  };

  const handleGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      const userEmail = auth.currentUser?.email;
      if (userEmail) {
        await fetch("https://hd-x2di.onrender.com/send-2fa", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: userEmail }),
        });
        localStorage.setItem("2fa_email", userEmail);
        navigate("/verify-2fa");
      } else {
        alert("Google login succeeded but no email found.");
      }
    } catch (err) {
      console.error("Google login:", err);
      alert(err.message || "Google login failed");
    }
  };

  return (
    <div className="min-h-screen flex flex-col text-[#1e293b] bg-gradient-to-br from-[#E9F1FF] via-[#F5FAFF] to-white">
      {/* === NAVBAR === */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-[#0033A0] via-[#0055C8] to-[#009FE3] shadow-md border-b border-blue-200 backdrop-blur-md">
        <div className="flex justify-between items-center px-8 py-4">
          <h1
            onClick={() => navigate("/")}
            className="text-2xl font-extrabold text-white cursor-pointer tracking-tight hover:scale-105 transition-transform"
          >
            DEV<span className="text-yellow-300">@</span>Deakin
          </h1>
          <div className="flex items-center gap-6">
            <button
              onClick={() => navigate("/register")}
              className="text-white hover:text-yellow-300 font-medium transition-colors"
            >
              Register
            </button>
            <button
              onClick={() => navigate("/login")}
              className="text-white hover:text-yellow-300 font-medium transition-colors"
            >
              Login
            </button>
          </div>
        </div>
      </nav>

      {/* === LOGIN BOX === */}
      <div className="flex-grow flex items-center justify-center mt-24">
        <div className="w-full max-w-md bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl border border-gray-100 p-8 mx-4">
          <h2 className="text-3xl font-semibold text-center text-gray-800 mb-2">
            Welcome
          </h2>
          <p className="text-center text-gray-500 mb-6 text-sm">
            Sign in to continue to{" "}
            <span className="font-medium text-blue-600">Dev@Deakin</span>
          </p>

          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <div>
              <label className="text-sm font-medium text-gray-600 mb-1 block">
                Email Address
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="p-3 w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-600 mb-1 block">
                Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="p-3 w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              />
            </div>

            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold text-lg transition-all duration-200 shadow-md hover:shadow-lg"
            >
              Sign In
            </button>
          </form>

          <div className="flex items-center my-6">
            <hr className="grow border-gray-300" />
            <span className="mx-3 text-gray-500 text-sm">OR</span>
            <hr className="grow border-gray-300" />
          </div>

          <button
            onClick={handleGoogle}
            className="w-full py-3 bg-white border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-100 transition-all duration-200 flex items-center justify-center gap-2 shadow-sm"
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
              className="w-5 h-5"
            />
            Continue with Google
          </button>

          <p className="text-center mt-6 text-gray-600 text-sm">
            Don’t have an account?{" "}
            <Link
              to="/register"
              className="text-blue-600 font-semibold hover:underline transition-all"
            >
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
