

// src/components/Chat/MessageInput.jsx
import React, { useState } from "react";
import { ref, push, set } from "firebase/database";
import { db } from "../../firebase/config";


export default function MessageInput({ roomId, user }) {
  const [text, setText] = useState("");

  const handleSend = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    try {
      const msgRef = push(ref(db, `messages/${roomId}`));
      await set(msgRef, {
        text: text.trim(),
        senderId: user.uid || "anon",
        senderName:
          user.displayName || user.email?.split("@")[0] || "Anonymous",
        senderEmail: user.email || "unknown",
        ts: Date.now(),
      });
      setText("");
    } catch (err) {
      console.error("Send failed:", err);
    }
  };

  return (
    <form
      onSubmit={handleSend}
      className="flex items-center border-t bg-white px-4 py-2 gap-2"
    >
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type a message..."
        className="flex-1 px-3 py-2 text-sm border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full"
      >
        Send
      </button>
    </form>
  );
}
