
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Logout from "../components/Auth/Logout";

export default function Dashboard() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#E9F1FF] via-[#F5FAFF] to-white text-gray-800 relative overflow-hidden">
      {/* Soft Blurs */}
      <div className="absolute top-[-10%] right-[-10%] w-[300px] h-[300px] bg-blue-300/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[300px] h-[300px] bg-purple-300/30 rounded-full blur-3xl"></div>

      {/* === NAVBAR === */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-[#0033A0] via-[#0055C8] to-[#009FE3] shadow-md border-b border-blue-200 backdrop-blur-md">
        <div className="flex justify-between items-center px-8 py-4">
          <h1
            onClick={() => navigate("/dashboard")}
            className="text-2xl sm:text-3xl font-extrabold text-white cursor-pointer tracking-wide hover:scale-105 transition-transform"
          >
            DEV<span className="text-yellow-400">@</span>Deakin
          </h1>

          <div className="flex items-center gap-5">
            <span className="text-white font-medium bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
               {currentUser?.displayName || currentUser?.email}
            </span>
            <button
              onClick={() => Logout()}
              className="bg-white text-[#0033A0] font-semibold px-5 py-2 rounded-full shadow-md hover:bg-blue-50 hover:scale-105 transition-all border border-blue-100"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* === MAIN SECTION === */}
      <main className="flex flex-col items-center justify-start flex-grow px-6 pt-32 pb-20 text-center">
        {/* Welcome Section */}
        <div className="mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-[#0033A0] mb-3">
            Welcome, {currentUser?.displayName || "Student"} 🎓
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-base sm:text-lg">
            Your personal hub to learn, connect, and grow.  
            Explore tutorials, chat with peers, and stay informed about tech news & events.
          </p>
        </div>

        {/* Action Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10 w-full max-w-5xl">
          {/* Tutorials */}
          <div
            onClick={() => navigate("/tutorials")}
            className="group cursor-pointer bg-gradient-to-br from-[#0055C8] to-[#009FE3] text-white rounded-3xl p-10 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all"
          >
            <div className="text-6xl mb-4 group-hover:scale-110 transition">🎥</div>
            <h3 className="text-2xl font-semibold mb-2">Tutorials</h3>
            <p className="text-white/90 text-sm">
              Watch, upload, and share tutorials with your peers.
            </p>
          </div>

          {/* Chat Rooms */}
          <div
            onClick={() => navigate("/chat")}
            className="group cursor-pointer bg-gradient-to-br from-green-500 to-emerald-500 text-white rounded-3xl p-10 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all"
          >
            <div className="text-6xl mb-4 group-hover:scale-110 transition">💬</div>
            <h3 className="text-2xl font-semibold mb-2">Chat Rooms</h3>
            <p className="text-white/90 text-sm">
              Connect with classmates and discuss project ideas together.
            </p>
          </div>

          {/* Tech News */}
          <div
            onClick={() => navigate("/news")}
            className="group cursor-pointer bg-gradient-to-br from-[#6B46C1] to-[#9F7AEA] text-white rounded-3xl p-10 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all"
          >
            <div className="text-6xl mb-4 group-hover:scale-110 transition">📰</div>
            <h3 className="text-2xl font-semibold mb-2">Tech Feed</h3>
            <p className="text-white/90 text-sm">
              Stay ahead with the latest trends, startups, and developer news.
            </p>
          </div>
        </div>

        {/* Tip Section */}
        <p className="mt-16 text-gray-500 text-sm italic">
          💡 Tip: Explore tutorials before joining the chat for smarter discussions!
        </p>


        {/* === Resources Section === */}
        <section className="mt-16 max-w-5xl w-full text-left bg-gradient-to-r from-[#F5FAFF] to-[#E9F1FF] border border-blue-100 rounded-2xl shadow-md p-8">
          <h3 className="text-2xl font-semibold text-[#0033A0] mb-4">📚 Learning Resources</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <a
              href="https://developer.mozilla.org/"
              target="_blank"
              rel="noreferrer"
              className="block p-5 bg-white rounded-xl shadow hover:shadow-lg transition"
            >
              <h4 className="font-semibold text-[#0033A0] mb-1">MDN Docs</h4>
              <p className="text-gray-600 text-sm">Best place to learn HTML, CSS, and JavaScript.</p>
            </a>
            <a
              href="https://react.dev/"
              target="_blank"
              rel="noreferrer"
              className="block p-5 bg-white rounded-xl shadow hover:shadow-lg transition"
            >
              <h4 className="font-semibold text-[#0033A0] mb-1">React Official Docs</h4>
              <p className="text-gray-600 text-sm">Master modern React and component-based design.</p>
            </a>
            <a
              href="https://firebase.google.com/docs"
              target="_blank"
              rel="noreferrer"
              className="block p-5 bg-white rounded-xl shadow hover:shadow-lg transition"
            >
              <h4 className="font-semibold text-[#0033A0] mb-1">Firebase Docs</h4>
              <p className="text-gray-600 text-sm">Learn backend integration with Firestore & Auth.</p>
            </a>
          </div>
        </section>
      </main>

      {/* === FOOTER === */}
      <footer className="text-center text-gray-600 text-sm py-6 border-t bg-white/70 backdrop-blur-sm mt-10">
        © {new Date().getFullYear()}{" "}
        <span className="font-semibold text-[#0033A0]">DEV@Deakin</span> — Empowering Student Developers 🚀
      </footer>
    </div>
  );
}
