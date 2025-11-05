
import React from "react";
import Logout from "../Auth/Logout";
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react"; // for nice icon (optional)

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 left-0 w-full bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-200 z-50 flex justify-between items-center px-8 py-4">
      {/* Logo */}
      <h1
        className="text-2xl font-extrabold text-[#0033A0] cursor-pointer tracking-wide"
        onClick={() => navigate("/")}
      >
        DEV<span className="text-yellow-400">@</span>Deakin
      </h1>

      {/* Logout button */}
      <button
        onClick={() => Logout()}
        className="flex items-center gap-2 bg-gradient-to-r from-[#0033A0] via-[#0055C8] to-[#009FE3] text-white font-semibold px-5 py-2 rounded-full shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300"
      >
        <LogOut size={18} className="text-white" />
        <span>Logout</span>
      </button>
    </nav>
  );
}
