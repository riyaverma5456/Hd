
// src/pages/ChatPage.jsx
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

import ChatNavbar from "../components/Chat/ChatNavbar";
import RoomList from "../components/Chat/RoomList";
import ChatRoom from "../components/Chat/ChatRoom";

export default function ChatPage() {
  const { currentUser } = useAuth();
  const [selectedRoom, setSelectedRoom] = useState(null);

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* === Navbar === */}
      <ChatNavbar user={currentUser} />

      {/* === Layout === */}
      <div className="flex flex-1 pt-16 h-full overflow-hidden">
        {/* === Sidebar (Room list) === */}
        <div className="hidden md:flex flex-col w-1/3 lg:w-1/4 bg-white border-r shadow-sm">
          <RoomList
            onSelectRoom={(room) => setSelectedRoom(room)} // Pass full room object
            selectedRoom={selectedRoom}
          />
        </div>

        {/* === Chat area === */}
        <div className="flex-1 flex flex-col bg-[#F8FAFF]">
          {selectedRoom ? (
            <ChatRoom
              room={selectedRoom}                // Pass full room object
              user={currentUser}                 // ✅ Send logged-in user
              onClose={() => setSelectedRoom(null)}
            />
          ) : (
            <div className="flex flex-col items-center justify-center flex-1 text-gray-500 select-none">
              <div className="text-5xl mb-4">💬</div>
              <p className="text-lg font-medium">
                Select a room to start chatting
              </p>
              <p className="text-sm text-gray-400 mt-1">
                Your conversations will appear here
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
