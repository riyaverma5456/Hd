
// src/components/Chat/ChatNavbar.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CreateRoomModal from "../UI/CreateRoomModal";
import { useAuth } from "../../context/AuthContext";

export default function ChatNavbar({ onRoomCreated }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  return (
    <>
      {/* === NAVBAR === */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-[#0033A0] via-[#0055C8] to-[#009FE3] shadow-md border-b border-blue-200 backdrop-blur-md">
        <div className="flex justify-between items-center px-8 py-4 text-white">
          {/* === Left section === */}
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-bold tracking-wide">
              💬 DEV@Deakin Chat
            </h1>
          </div>

          {/* === Right section === */}
          <div className="flex items-center gap-4">
            {/* Dashboard button */}
            <button
              onClick={() => navigate("/dashboard")}
              className="bg-white/20 hover:bg-white/30 text-white font-medium px-4 py-2 rounded-lg transition-all backdrop-blur-sm"
            >
              Dashboard
            </button>

            {/* Create Room button */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-white text-blue-700 hover:bg-blue-50 font-semibold px-4 py-2 rounded-lg shadow-sm transition-all"
            >
              + Create Room
            </button>

            {/* User info */}
            <div className="text-sm text-white/90">
              Logged in as{" "}
              <span className="font-semibold text-white">
                {currentUser?.displayName || "User"}
              </span>
            </div>
          </div>
        </div>
      </nav>

      {/* === Create Room Modal === */}
      {isModalOpen && (
        <CreateRoomModal
          onClose={() => setIsModalOpen(false)}
          onCreate={onRoomCreated}
        />
      )}
    </>
  );
}



