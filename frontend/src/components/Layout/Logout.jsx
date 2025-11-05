// src/components/Auth/Logout.jsx
import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/config";
import { useNavigate } from "react-router-dom";

export default function Logout() {
  const navigate = useNavigate();
  const handleLogout = async () => {
    await signOut(auth);
    localStorage.removeItem("2fa_verified");
    localStorage.removeItem("2fa_email");
    navigate("/login");
  };
  return <button onClick={handleLogout}>Logout</button>;
}
