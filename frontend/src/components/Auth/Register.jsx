import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { createUserWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import { auth, googleProvider } from "../../firebase/config";

export default function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      setLoading(true);
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName: name });
      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    try {
      setLoading(true);
      await signInWithPopup(auth, googleProvider);
      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-100 flex flex-col">
      {/* Navbar */}
      <nav className="w-full bg-gradient-to-r from-[#0033A0] via-[#0055C8] to-[#009FE3] shadow-lg py-4 px-6 flex justify-between items-center border-b border-blue-400/30">
        <h1
          className="text-2xl font-bold text-white tracking-tight cursor-pointer drop-shadow-sm"
          onClick={() => navigate("/")}
        >
          DEV<span className="text-yellow-300">@Deakin</span>
        </h1>
        <div className="space-x-6">
          <Link
            to="/login"
            className="text-white hover:text-yellow-300 transition duration-200"
          >
            Login
          </Link>
        </div>
      </nav>

      {/* Register Form */}
      <div className="flex-grow flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md border border-blue-100">
          <h2 className="text-3xl font-bold text-center text-[#0033A0] mb-6">
            Create an Account
          </h2>

          {error && (
            <div className="bg-red-100 text-red-700 p-2 rounded text-center mb-4 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-4">
            {/* Full Name */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Full Name
              </label>
              <input
                type="text"
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Email Address
              </label>
              <input
                type="email"
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Password
              </label>
              <input
                type="password"
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter your password"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-[#0033A0] via-[#0055C8] to-[#009FE3] text-white py-3 rounded-lg font-semibold shadow-md hover:opacity-90 transition"
            >
              {loading ? "Creating Account..." : "Register"}
            </button>
          </form>

          {/* Google Signup */}
          <div className="mt-6 text-center">
            <p className="text-gray-600 mb-2">Or sign up with</p>
            <button
              onClick={handleGoogleSignup}
              className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg font-medium transition duration-200"
            >
              Continue with Google
            </button>
          </div>

          <p className="mt-6 text-sm text-gray-600 text-center">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-[#0055C8] font-medium hover:underline"
            >
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
