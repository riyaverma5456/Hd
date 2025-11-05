// src/components/Auth/Verify2FA.jsx
import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Verify2FA() {
  const [code, setCode] = useState("");
  const [timer, setTimer] = useState(120);
  const [attempts, setAttempts] = useState(0);
  const [resendEnabled, setResendEnabled] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const email = localStorage.getItem("2fa_email");

  // Timer logic + redirect if email missing
  useEffect(() => {
    if (!email) {
      navigate("/login");
      return;
    }

    if (timer > 0) {
      const interval = setInterval(() => setTimer((t) => t - 1), 1000);
      return () => clearInterval(interval);
    } else {
      setResendEnabled(true);
    }
  }, [timer, email, navigate]);

  const formatTime = (s) =>
    `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, "0")}`;

  // Handle verify button click
  const handleVerify = async (e) => {
    e.preventDefault();
    if (attempts >= 3)
      return setError("❌ Too many attempts. Please resend the code.");

    try {
      const res = await fetch("https://hd-x2di.onrender.com/verify-2fa", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code }),
      });
      const data = await res.json();

      if (data.success) {
        localStorage.setItem("2fa_verified", email);
        localStorage.removeItem("2fa_email");
        alert("✅ Verification successful!");
        navigate("/dashboard");
      } else {
        setAttempts((a) => a + 1);
        setError(data.error || "Invalid code. Try again.");
      }
    } catch (err) {
      console.error(err);
      setError("Verification failed. Try again.");
    }
  };

  // Handle resend button
  const handleResend = async () => {
    try {
      const res = await fetch("https://hd-x2di.onrender.com/send-2fa", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();

      if (data.success) {
        setTimer(120);
        setResendEnabled(false);
        setAttempts(0);
        setError("");
        alert("📩 New 2FA code sent to your email!");
      } else {
        setError("Failed to resend code.");
      }
    } catch (err) {
      console.error(err);
      setError("Resend failed. Try again later.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-100 flex flex-col">
      {/* === NAVBAR === */}
      <nav className="w-full bg-gradient-to-r from-[#0033A0] via-[#0055C8] to-[#009FE3] shadow-lg border-b border-blue-200 backdrop-blur-md py-4 px-8 flex justify-between items-center fixed top-0 left-0 z-50">
        <h1
          onClick={() => navigate("/")}
          className="text-2xl font-extrabold text-white cursor-pointer tracking-tight hover:scale-105 transition-transform"
        >
          DEV<span className="text-yellow-300">@</span>Deakin
        </h1>
        <div className="space-x-8">
          <Link
            to="/"
            className="text-white/90 hover:text-yellow-300 font-medium transition-colors duration-200"
          >
            Home
          </Link>
          <Link
            to="/login"
            className="text-white/90 hover:text-yellow-300 font-medium transition-colors duration-200"
          >
            Login
          </Link>
        </div>
      </nav>

      {/* === MAIN CARD === */}
      <div className="flex flex-grow items-center justify-center px-4 pt-24">
        <div className="w-full max-w-md bg-white/90 backdrop-blur-md rounded-2xl shadow-xl p-8 border border-blue-100">
          <h2 className="text-2xl font-bold text-center text-[#0033A0] mb-4">
            Verify Your Identity 🔐
          </h2>

          <p className="text-center text-gray-600 mb-6 text-sm">
            Enter the 6-digit code sent to your email <br />
            <span className="font-medium text-blue-600">{email}</span>
          </p>

          <form onSubmit={handleVerify} className="space-y-4">
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Enter 6-digit code"
              maxLength="6"
              required
              disabled={attempts >= 3}
              className="w-full px-4 py-3 text-center text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0033A0] focus:outline-none tracking-widest disabled:bg-gray-100 disabled:text-gray-400"
            />

            <button
              type="submit"
              disabled={attempts >= 3}
              className={`w-full py-3 rounded-lg font-semibold shadow transition-all duration-200 ${
                attempts >= 3
                  ? "bg-gray-400 text-white cursor-not-allowed"
                  : "bg-[#0033A0] hover:bg-[#0047CC] text-white"
              }`}
            >
              Verify Code
            </button>
          </form>

          {error && (
            <div className="bg-red-100 text-red-700 text-sm p-2 mt-4 rounded text-center border border-red-200">
              {error}
            </div>
          )}

          <div className="mt-6 text-center text-gray-600 text-sm">
            <p>
              Time remaining:{" "}
              <span className="font-semibold text-[#0033A0]">
                {formatTime(timer)}
              </span>
            </p>
            <p className="mt-1">Attempts: {attempts} / 3</p>

            <button
              onClick={handleResend}
              disabled={!resendEnabled}
              className={`w-full mt-5 py-3 rounded-lg font-medium transition-all duration-200 ${
                resendEnabled
                  ? "border border-[#0033A0] text-[#0033A0] hover:bg-[#0033A0]/10"
                  : "border border-gray-300 text-gray-400 cursor-not-allowed"
              }`}
            >
              Resend Code
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
