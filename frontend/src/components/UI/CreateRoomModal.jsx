

import React, { useState } from "react";
import { ref, push, set } from "firebase/database";
import { db } from "../../firebase/config";

export default function CreateRoomModal({ onClose }) {
  const [roomName, setRoomName] = useState("");
  const [pin, setPin] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCreate = async () => {
    const name = roomName.trim();
    if (!name) return alert("Room name cannot be empty!");

    setLoading(true);
    try {
      const roomRef = ref(db, "rooms");
      const newRoom = push(roomRef);
      await set(newRoom, {
        name,
        pin: pin || "",
        createdAt: Date.now(),
      });

      alert("Room created successfully!");
      onClose();
    } catch (error) {
      console.error("Error creating room:", error);
      alert("Failed to create room.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg w-96 p-6">
        <h2 className="text-xl font-semibold mb-4">Create New Room</h2>
        <input
          type="text"
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
          placeholder="Enter room name"
          className="w-full p-2 border rounded mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          value={pin}
          maxLength={4}
          onChange={(e) => setPin(e.target.value.replace(/\D/, ""))}
          placeholder="Optional 4-digit PIN"
          className="w-full p-2 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleCreate}
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Creating..." : "Create"}
          </button>
        </div>
      </div>
    </div>
  );
}
