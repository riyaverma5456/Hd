// src/components/Chat/MessageList.jsx
import React, { useEffect, useRef, useState } from "react";
import { ref, onValue } from "firebase/database";
import { db } from "../../firebase/config";

export default function MessageList({ roomId, user }) {
  const [messages, setMessages] = useState([]);
  const bottomRef = useRef(null);

  useEffect(() => {
    if (!roomId) return;
    const messagesRef = ref(db, `messages/${roomId}`);
    const unsubscribe = onValue(messagesRef, (snap) => {
      const data = snap.val() || {};
      const list = Object.entries(data).map(([id, msg]) => ({
        id,
        ...msg,
      }));
      list.sort((a, b) => (a.ts || a.timestamp) - (b.ts || b.timestamp));
      setMessages(list);
    });

    return () => unsubscribe();
  }, [roomId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col h-full bg-[#F8FAFF]">
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.length === 0 && (
          <div className="text-center text-gray-400 mt-10">
            No messages yet — start chatting 💬
          </div>
        )}
        {messages.map((msg) => {
          const mine = msg.senderEmail === user?.email;
          return (
            <div
              key={msg.id}
              className={`flex ${mine ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[75%] px-4 py-2 rounded-2xl shadow-sm ${
                  mine
                    ? "bg-blue-600 text-white rounded-br-none"
                    : "bg-white text-gray-800 rounded-bl-none border border-gray-200"
                }`}
              >
                {!mine && (
                  <div className="text-xs font-semibold text-gray-700 mb-1">
                    {msg.senderName || msg.senderEmail?.split("@")[0]}
                  </div>
                )}
                <div>{msg.text}</div>
              </div>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>
    </div>
  );
}
