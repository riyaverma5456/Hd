// src/components/Chat/RoomList.jsx
import React, { useState, useEffect } from "react";
import { ref, onValue, remove, get } from "firebase/database";
import { db } from "../../firebase/config";
import { Trash2, Lock } from "lucide-react";

export default function RoomList({ onSelectRoom, selectedRoom }) {
  const [rooms, setRooms] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const roomsRef = ref(db, "rooms");
    const unsubscribe = onValue(roomsRef, (snapshot) => {
      const data = snapshot.val();
      if (!data) {
        setRooms([]);
        return;
      }
      const list = Object.entries(data).map(([id, value]) =>
        typeof value === "object" ? { id, ...value } : { id, name: value }
      );
      setRooms(list);
    });

    return () => unsubscribe();
  }, []);

  const filteredRooms = rooms.filter((r) =>
    r?.name?.toLowerCase().includes(search.toLowerCase())
  );

const deleteRoom = async (roomId) => {
  try {
    const roomRef = ref(db, `rooms/${roomId}`);
    const snap = await get(roomRef);

    if (!snap.exists()) {
      alert("Room not found ❌");
      return;
    }

    const roomData = snap.val();

    // Check if room is locked
    if (roomData.pin) {
      const enteredPin = prompt("🔒 Enter the room PIN to delete this room:");
      if (enteredPin !== roomData.pin) {
        alert("❌ Incorrect PIN — room not deleted.");
        return;
      }
    } else {
      const confirmDelete = window.confirm("Delete this unlocked room?");
      if (!confirmDelete) return;
    }

    await remove(ref(db, `rooms/${roomId}`));
    await remove(ref(db, `messages/${roomId}`));

    if (selectedRoom?.id === roomId) onSelectRoom(null);

    alert("✅ Room deleted successfully!");
  } catch (err) {
    console.error("Error deleting room:", err);
    alert("❌ Failed to delete room");
  }
};



  return (
    <div className="flex flex-col h-full bg-white">
      <div className="p-3 border-b border-gray-200">
        <input
          placeholder="🔍 Search or start new chat"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-2 text-sm bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
        {filteredRooms.map((room) => (
          <div
            key={room.id}
            onClick={() => onSelectRoom(room)}
            className={`group flex items-center justify-between px-4 py-3 cursor-pointer transition-all border-b border-gray-100
              ${
                selectedRoom?.id === room.id
                  ? "bg-blue-50 border-l-4 border-blue-500"
                  : "hover:bg-gray-50"
              }`}
          >
            <div className="flex items-center gap-3 min-w-0 flex-1">
              <div className="w-10 h-10 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full font-semibold text-sm">
                {room.name?.[0]?.toUpperCase() || "?"}
              </div>

              <div className="min-w-0 flex-1">
                <div className="font-medium text-gray-800 truncate">
                  #{room.name}
                </div>
                {room.pin && (
                  <div className="flex items-center text-xs text-gray-500 gap-1">
                    <Lock size={12} /> Locked
                  </div>
                )}
              </div>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                deleteRoom(room.id);
              }}
              className="opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-700 transition"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}

        {filteredRooms.length === 0 && (
          <p className="text-gray-500 text-center mt-6 text-sm">
            No rooms found 😕
          </p>
        )}
      </div>
    </div>
  );
}
