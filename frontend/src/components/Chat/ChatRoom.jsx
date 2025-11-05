
// src/components/Chat/ChatRoom.jsx
import React, { useEffect, useState } from "react";
import { ref, get, remove } from "firebase/database";
import { db } from "../../firebase/config";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";

export default function ChatRoom({ room, user, onClose }) {
  const [pin, setPin] = useState(null);
  const [enteredPin, setEnteredPin] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletePin, setDeletePin] = useState("");

  // === Fetch Room PIN on Mount ===
  useEffect(() => {
    if (!room) return;
    setLoading(true);
    const fetchPin = async () => {
      try {
        const roomRef = ref(db, `rooms/${room.id}`);
        const snap = await get(roomRef);
        if (snap.exists()) {
          const data = snap.val();
          setPin(data.pin || null);
        } else {
          setPin(null);
        }
      } catch (err) {
        console.error("Error loading room pin:", err);
      } finally {
        setLoading(false);
        setUnlocked(false);
        setEnteredPin("");
      }
    };
    fetchPin();
  }, [room]);

  // === Unlock Room ===
  const handleUnlock = () => {
    if (!pin || enteredPin === pin) {
      setUnlocked(true);
    } else {
      alert("Incorrect password ❌");
    }
  };

  // === Clear Messages ===
  const handleClear = async () => {
    if (!window.confirm("Clear all messages in this room?")) return;
    await remove(ref(db, `messages/${room.id}`));
    alert("Chat cleared ✅");
  };

  // === Delete Room (with password modal) ===
  const handleConfirmDelete = async () => {
    try {
      const roomRef = ref(db, `rooms/${room.id}`);
      const snap = await get(roomRef);

      if (!snap.exists()) {
        alert("❌ Room not found.");
        return;
      }

      const roomData = snap.val();

      if (roomData.pin && roomData.pin !== deletePin) {
        alert("❌ Incorrect password. Room not deleted.");
        return;
      }

      await remove(ref(db, `rooms/${room.id}`));
      await remove(ref(db, `messages/${room.id}`));

      alert("✅ Room deleted successfully!");
      setShowDeleteModal(false);
      onClose?.();
    } catch (error) {
      console.error("Error deleting room:", error);
      alert("⚠️ Failed to delete room. Please try again.");
    }
  };

  // === Return UI ===
  if (!room)
    return (
      <div className="flex h-full items-center justify-center text-gray-500">
        Select a room to start chatting 💬
      </div>
    );

  if (loading)
    return (
      <div className="flex h-full items-center justify-center text-gray-500">
        Loading room info...
      </div>
    );

  // 🔒 Ask for password if locked and not unlocked
  if (pin && !unlocked)
    return (
      <div className="flex flex-col h-full items-center justify-center bg-gray-50">
        <h2 className="text-xl font-semibold mb-2">🔒 {room.name}</h2>
        <p className="text-gray-500 mb-4">This room is locked. Enter PIN:</p>
        <input
          type="password"
          value={enteredPin}
          onChange={(e) => setEnteredPin(e.target.value)}
          placeholder="Enter PIN"
          className="border px-3 py-2 rounded mb-3"
        />
        <button
          onClick={handleUnlock}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Unlock
        </button>
      </div>
    );

  return (
    <div className="flex flex-col h-full">
      {/* === Header === */}
      <div className="flex justify-between items-center bg-white px-4 py-3 border-b">
        <div>
          <h3 className="text-lg font-semibold">#{room.name}</h3>
          <p className="text-xs text-gray-500">
            {pin ? "🔒 Locked Room" : "Unlocked"}
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={handleClear}
            className="text-sm text-red-600 hover:underline"
          >
            Clear Chat
          </button>
          <button
            onClick={() => setShowDeleteModal(true)}
            className="text-sm text-red-600 hover:underline"
          >
            Delete Room
          </button>
          <button
            onClick={onClose}
            className="text-sm text-blue-600 hover:underline"
          >
            ← Back
          </button>
        </div>
      </div>

      {/* === Messages === */}
      <div className="flex-1 min-h-0">
        <MessageList roomId={room.id} user={user} />
      </div>

      {/* === Input === */}
      <MessageInput roomId={room.id} user={user} />

      {/* === Delete Modal === */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg w-96 p-6">
            <h2 className="text-xl font-semibold mb-3 text-red-600">
              Delete Room
            </h2>
            <p className="text-gray-600 mb-4">
              Enter the room PIN to confirm deletion:
            </p>
            <input
              type="password"
              value={deletePin}
              onChange={(e) => setDeletePin(e.target.value)}
              placeholder="Enter PIN"
              className="w-full p-2 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
