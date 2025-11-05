
// // src/pages/ChatPage.jsx
// import React, { useState } from "react";
// import { useAuth } from "../context/AuthContext";

// import ChatNavbar from "../components/Chat/ChatNavbar";
// import RoomList from "../components/Chat/RoomList";
// import ChatRoom from "../components/Chat/ChatRoom";

// export default function ChatPage() {
//   const { currentUser } = useAuth();
//   const [selectedRoom, setSelectedRoom] = useState(null);

//   return (
//     <div className="flex flex-col h-screen bg-gray-100">
//       {/* === Navbar === */}
//       <ChatNavbar user={currentUser} />

//       {/* === Layout === */}
//       <div className="flex flex-1 pt-16 h-full overflow-hidden">
//         {/* === Sidebar (Room list) === */}
//         <div className="hidden md:flex flex-col w-1/3 lg:w-1/4 bg-white border-r shadow-sm">
//           <RoomList
//             onSelectRoom={(room) => setSelectedRoom(room)} // Pass full room object
//             selectedRoom={selectedRoom}
//           />
//         </div>

//         {/* === Chat area === */}
//         <div className="flex-1 flex flex-col bg-[#F8FAFF]">
//           {selectedRoom ? (
//             <ChatRoom
//               room={selectedRoom}                // Pass full room object
//               user={currentUser}                 // ✅ Send logged-in user
//               onClose={() => setSelectedRoom(null)}
//             />
//           ) : (
//             <div className="flex flex-col items-center justify-center flex-1 text-gray-500 select-none">
//               <div className="text-5xl mb-4">💬</div>
//               <p className="text-lg font-medium">
//                 Select a room to start chatting
//               </p>
//               <p className="text-sm text-gray-400 mt-1">
//                 Your conversations will appear here
//               </p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }



import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CreateRoomModal from "../UI/CreateRoomModal";

export default function ChatNavbar({ user, onRoomCreated }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-[#0033A0] via-[#0055C8] to-[#009FE3] shadow-md border-b border-blue-200 backdrop-blur-md">
        <div className="flex justify-between items-center px-8 py-4 text-white">
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-bold tracking-wide">
              💬 DEV@Deakin Chat
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/dashboard")}
              className="bg-white/20 hover:bg-white/30 text-white font-medium px-4 py-2 rounded-lg transition-all backdrop-blur-sm"
            >
              Dashboard
            </button>

            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-white text-blue-700 hover:bg-blue-50 font-semibold px-4 py-2 rounded-lg shadow-sm transition-all"
            >
              + Create Room
            </button>

            <div className="text-sm text-white/90">
              Logged in as{" "}
              <span className="font-semibold text-white">
                {user?.displayName || "User"}
              </span>
            </div>
          </div>
        </div>
      </nav>

      {isModalOpen && (
        <CreateRoomModal
          onClose={() => setIsModalOpen(false)}
          onCreate={onRoomCreated}
        />
      )}
    </>
  );
}
