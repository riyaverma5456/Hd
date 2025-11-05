
import React, { useState } from "react";

const Sidebar = ({ rooms, onSelectRoom }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredRooms = rooms.filter((room) =>
    room.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-1/4 bg-white border-r border-gray-200 h-screen flex flex-col">
      {/* Heading */}
      <div className="p-4 border-b border-gray-200 flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">Chats</h2>
        <button className="bg-blue-500 text-white text-sm px-3 py-1 rounded-md hover:bg-blue-600 transition">
          + New Chat
        </button>
      </div>

      {/* Search Bar */}
      <div className="p-3">
        <input
          type="text"
          placeholder="Search rooms..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto">
        {filteredRooms.length > 0 ? (
          filteredRooms.map((room, index) => (
            <div
              key={index}
              onClick={() => onSelectRoom(room)} // ✅ opens the selected chat
              className="px-4 py-3 cursor-pointer hover:bg-blue-50 transition flex items-center justify-between"
            >
              <span className="text-gray-700 font-medium">#{room}</span>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-sm p-4">No chats found</p>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
